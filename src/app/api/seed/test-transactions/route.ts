import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { tables, tableSessions } from '@/schema/tables';
import { fnbOrders, fnbOrderItems, fnbItems, staff } from '@/schema/fnb';
import { payments } from '@/schema/payments';
import { eq, and } from 'drizzle-orm';
import { auth } from '@/lib/auth';

export async function POST() {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log('🧪 Creating test transaction data...');

    // Get available tables
    const availableTables = await db.select().from(tables)
      .where(eq(tables.status, 'available'))
      .limit(3);

    if (availableTables.length === 0) {
      return NextResponse.json({ 
        error: 'No available tables found. Please run the main seed first.' 
      }, { status: 400 });
    }

    // Get some F&B items for orders
    const fnbItemsList = await db.select().from(fnbItems)
      .where(eq(fnbItems.isActive, true))
      .limit(10);

    if (fnbItemsList.length === 0) {
      return NextResponse.json({ 
        error: 'No F&B items found. Please run the main seed first.' 
      }, { status: 400 });
    }

    // Create some test staff if none exist
    const existingStaff = await db.select().from(staff).limit(1);
    let testStaff;
    
    if (existingStaff.length === 0) {
      const newStaff = await db.insert(staff).values([
        { name: 'John Doe', role: 'waiter' },
        { name: 'Jane Smith', role: 'cashier' },
      ]).returning();
      testStaff = newStaff[0];
    } else {
      testStaff = existingStaff[0];
    }

    const results = [];

    // Create 3 sample scenarios
    const scenarios = [
      {
        customerName: 'Alice Johnson',
        customerPhone: '081234567890',
        plannedDuration: 120, // 2 hours
        fnbOrders: [
          { items: [{ itemId: fnbItemsList[0].id, quantity: 2 }, { itemId: fnbItemsList[1].id, quantity: 1 }] },
          { items: [{ itemId: fnbItemsList[2].id, quantity: 1 }] }
        ]
      },
      {
        customerName: 'Bob Wilson',
        customerPhone: '081234567891',
        plannedDuration: 90, // 1.5 hours
        fnbOrders: [
          { items: [{ itemId: fnbItemsList[3].id, quantity: 3 }, { itemId: fnbItemsList[4].id, quantity: 2 }] }
        ]
      },
      {
        customerName: 'Carol Davis',
        customerPhone: null,
        plannedDuration: 60, // 1 hour
        fnbOrders: [
          { items: [{ itemId: fnbItemsList[5].id, quantity: 1 }, { itemId: fnbItemsList[0].id, quantity: 2 }] },
          { items: [{ itemId: fnbItemsList[6].id, quantity: 1 }] }
        ]
      }
    ];

    for (let i = 0; i < Math.min(scenarios.length, availableTables.length); i++) {
      const table = availableTables[i];
      const scenario = scenarios[i];
      
      console.log(`📊 Creating scenario ${i + 1} for ${table.name}...`);

      // 1. Start table session
      const newSession = await db.insert(tableSessions).values({
        tableId: table.id,
        customerName: scenario.customerName,
        customerPhone: scenario.customerPhone,
        startTime: new Date(Date.now() - (scenario.plannedDuration + 30) * 60 * 1000), // Started a bit ago
        plannedDuration: scenario.plannedDuration,
        staffId: testStaff.id,
        status: 'active',
      }).returning();

      // Update table status to occupied
      await db.update(tables)
        .set({ status: 'occupied' })
        .where(eq(tables.id, table.id));

      const sessionId = newSession[0].id;

      // 2. Create F&B orders for this table
      const createdOrders = [];
      for (const orderData of scenario.fnbOrders) {
        // Calculate order totals
        let subtotal = 0;
        for (const item of orderData.items) {
          const fnbItem = fnbItemsList.find(f => f.id === item.itemId);
          if (fnbItem) {
            subtotal += parseFloat(fnbItem.price) * item.quantity;
          }
        }
        const tax = subtotal * 0.1; // 10% tax
        const total = subtotal + tax;

        const orderNumber = `TABLE-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
        
        const order = await db.insert(fnbOrders).values({
          orderNumber,
          tableId: table.id,
          customerName: scenario.customerName,
          customerPhone: scenario.customerPhone,
          subtotal: subtotal.toFixed(2),
          tax: tax.toFixed(2),
          total: total.toFixed(2),
          status: 'pending',
          staffId: testStaff.id,
          notes: `Test order for ${scenario.customerName}`,
        }).returning();

        const orderId = order[0].id;

        // Create order items
        for (const item of orderData.items) {
          const fnbItem = fnbItemsList.find(f => f.id === item.itemId);
          if (fnbItem) {
            const itemSubtotal = parseFloat(fnbItem.price) * item.quantity;
            await db.insert(fnbOrderItems).values({
              orderId,
              itemId: item.itemId,
              quantity: item.quantity,
              unitPrice: fnbItem.price,
              subtotal: itemSubtotal.toFixed(2),
            });

            // Update stock
            const currentStock = fnbItem.stockQuantity || 0;
            await db.update(fnbItems)
              .set({ stockQuantity: Math.max(0, currentStock - item.quantity) })
              .where(eq(fnbItems.id, item.itemId));
          }
        }

        createdOrders.push(order[0]);
      }

      // 3. End the session (this will create the payment with proper linking)
      const endTime = new Date();
      const startTime = new Date(newSession[0].startTime);
      const actualDuration = Math.floor((endTime.getTime() - startTime.getTime()) / (1000 * 60));

      // Calculate costs
      const hourlyRate = parseFloat(table.hourlyRate);
      const billableHours = Math.ceil(actualDuration / 60);
      const tableCost = billableHours * hourlyRate;
      
      const fnbTotalCost = createdOrders.reduce((total, order) => {
        return total + parseFloat(order.total);
      }, 0);
      
      const totalCost = tableCost + fnbTotalCost;

      // End the session
      const endedSession = await db.update(tableSessions)
        .set({
          endTime,
          actualDuration,
          totalCost: totalCost.toFixed(2),
          status: 'completed',
          fnbOrderCount: createdOrders.length,
        })
        .where(eq(tableSessions.id, sessionId))
        .returning();

      // Create payment record
      const transactionId = `TXN-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
      
      const newPayment = await db.insert(payments).values({
        transactionNumber: transactionId,
        customerName: scenario.customerName,
        customerPhone: scenario.customerPhone,
        totalAmount: totalCost.toFixed(2),
        paymentMethods: JSON.stringify([{ type: 'cash', amount: totalCost.toFixed(2) }]),
        staffId: testStaff.id,
        status: 'pending',
        tableAmount: tableCost.toFixed(2),
        fnbAmount: fnbTotalCost.toFixed(2),
        discountAmount: '0',
        taxAmount: createdOrders.reduce((total, order) => total + parseFloat(order.tax || '0'), 0).toFixed(2),
        currency: 'IDR',
        createdAt: new Date(),
        updatedAt: new Date(),
      }).returning();

      const paymentId = newPayment[0].id;

      // Link the table session to the payment
      await db.update(tableSessions)
        .set({ paymentId })
        .where(eq(tableSessions.id, sessionId));

      // Link all F&B orders to the payment
      await db.update(fnbOrders)
        .set({ 
          paymentId,
          status: 'billed'
        })
        .where(and(
          eq(fnbOrders.tableId, table.id),
          eq(fnbOrders.status, 'pending')
        ));

      // Update table status to available
      await db.update(tables)
        .set({ status: 'available' })
        .where(eq(tables.id, table.id));

      results.push({
        table: table.name,
        customer: scenario.customerName,
        session: endedSession[0],
        orders: createdOrders,
        payment: newPayment[0],
        billing: {
          actualDuration,
          billableHours,
          tableCost,
          fnbTotalCost,
          totalCost
        }
      });

      console.log(`✅ Completed scenario ${i + 1}: ${scenario.customerName} at ${table.name}`);
    }

    console.log('🎉 Test transaction data created successfully!');

    return NextResponse.json({
      message: `Successfully created ${results.length} test transactions`,
      results
    });

  } catch (error) {
    console.error('❌ Error creating test transaction data:', error);
    return NextResponse.json({
      error: 'Failed to create test transaction data',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 