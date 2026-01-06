import { db } from './db';
import { 
  tables, 
  fnbCategories, 
  fnbItems, 
  staff, 
  users, 
  tableSessions, 
  fnbOrders, 
  fnbOrderItems, 
  payments, 
  orderAnalytics,
  systemSettings
} from '@/schema';

export async function seedDatabase() {
  try {
    console.log('🌱 Starting database seed...');

    // Create system settings for billing
    console.log('⚙️ Setting up system settings...');
    await db.insert(systemSettings).values([
      {
        key: 'billing_rate_type',
        value: 'hourly',
        description: 'Determines whether billing is calculated per hour or per minute'
      }
    ]).onConflictDoNothing();
    console.log('✅ System settings configured');

    // Create sample billiard tables
    const sampleTables = [
      { name: 'Table 1', hourlyRate: '50000', perMinuteRate: '833', status: 'available' },
      { name: 'Table 2', hourlyRate: '50000', perMinuteRate: '833', status: 'available' },
      { name: 'Table 3', hourlyRate: '60000', perMinuteRate: '1000', status: 'available' },
      { name: 'Table 4', hourlyRate: '60000', perMinuteRate: '1000', status: 'available' },
      { name: 'VIP Table 1', hourlyRate: '80000', perMinuteRate: '1333', status: 'available' },
      { name: 'VIP Table 2', hourlyRate: '80000', perMinuteRate: '1333', status: 'available' },
    ];

    console.log('📊 Creating billiard tables...');
    const createdTables = await db.insert(tables).values(sampleTables).returning();
    console.log(`✅ Created ${createdTables.length} tables`);

    // Create F&B categories
    const sampleCategories = [
      { name: 'Beverages', description: 'Cold and hot drinks' },
      { name: 'Snacks', description: 'Light snacks and finger foods' },
      { name: 'Meals', description: 'Full meals and main dishes' },
      { name: 'Desserts', description: 'Sweet treats and desserts' },
    ];

    console.log('🍽️ Creating F&B categories...');
    const createdCategories = await db.insert(fnbCategories).values(sampleCategories).returning();
    console.log(`✅ Created ${createdCategories.length} categories`);

    // Create F&B items
    const sampleItems = [
      // Beverages
      { categoryId: createdCategories[0].id, name: 'Coca Cola', price: '8000', cost: '5000', stockQuantity: 50, minStockLevel: 10, unit: 'bottle' },
      { categoryId: createdCategories[0].id, name: 'Sprite', price: '8000', cost: '5000', stockQuantity: 50, minStockLevel: 10, unit: 'bottle' },
      { categoryId: createdCategories[0].id, name: 'Coffee', price: '15000', cost: '8000', stockQuantity: 100, minStockLevel: 20, unit: 'cup' },
      { categoryId: createdCategories[0].id, name: 'Tea', price: '10000', cost: '5000', stockQuantity: 100, minStockLevel: 20, unit: 'cup' },
      { categoryId: createdCategories[0].id, name: 'Orange Juice', price: '12000', cost: '8000', stockQuantity: 30, minStockLevel: 5, unit: 'glass' },
      
      // Snacks
      { categoryId: createdCategories[1].id, name: 'French Fries', price: '20000', cost: '12000', stockQuantity: 25, minStockLevel: 5, unit: 'portion' },
      { categoryId: createdCategories[1].id, name: 'Chicken Wings', price: '35000', cost: '20000', stockQuantity: 20, minStockLevel: 5, unit: 'portion' },
      { categoryId: createdCategories[1].id, name: 'Nachos', price: '25000', cost: '15000', stockQuantity: 15, minStockLevel: 3, unit: 'portion' },
      { categoryId: createdCategories[1].id, name: 'Potato Wedges', price: '18000', cost: '10000', stockQuantity: 20, minStockLevel: 5, unit: 'portion' },
      
      // Meals
      { categoryId: createdCategories[2].id, name: 'Nasi Goreng', price: '35000', cost: '20000', stockQuantity: 15, minStockLevel: 3, unit: 'plate' },
      { categoryId: createdCategories[2].id, name: 'Mie Ayam', price: '30000', cost: '18000', stockQuantity: 12, minStockLevel: 3, unit: 'bowl' },
      { categoryId: createdCategories[2].id, name: 'Burger', price: '40000', cost: '25000', stockQuantity: 10, minStockLevel: 2, unit: 'piece' },
      
      // Desserts
      { categoryId: createdCategories[3].id, name: 'Ice Cream', price: '15000', cost: '8000', stockQuantity: 20, minStockLevel: 5, unit: 'scoop' },
      { categoryId: createdCategories[3].id, name: 'Chocolate Cake', price: '25000', cost: '15000', stockQuantity: 8, minStockLevel: 2, unit: 'slice' },
    ];

    console.log('🍕 Creating F&B items...');
    const createdItems = await db.insert(fnbItems).values(sampleItems).returning();
    console.log(`✅ Created ${createdItems.length} F&B items`);

    // Create staff members
    const sampleStaff = [
      { name: 'Ahmad Satori', role: 'Manager' },
      { name: 'Sarah Putri', role: 'Cashier' },
      { name: 'Budi Santoso', role: 'Server' },
      { name: 'Diana Wati', role: 'Kitchen Staff' },
      { name: 'Eko Prasetyo', role: 'Server' },
      { name: 'Fitri Rahmawati', role: 'Cashier' },
    ];

    console.log('👥 Creating staff members...');
    const createdStaff = await db.insert(staff).values(sampleStaff).returning();
    console.log(`✅ Created ${createdStaff.length} staff members`);

    // Create users with different roles
    const sampleUsers = [
      { name: 'Admin User', email: 'admin@chalkboard.com', role: 'admin', password: 'hashed_password_1' },
      { name: 'Manager Ahmad', email: 'ahmad@chalkboard.com', role: 'manager', password: 'hashed_password_2' },
      { name: 'Staff Sarah', email: 'sarah@chalkboard.com', role: 'staff', password: 'hashed_password_3' },
      { name: 'Staff Budi', email: 'budi@chalkboard.com', role: 'staff', password: 'hashed_password_4' },
      { name: 'Staff Diana', email: 'diana@chalkboard.com', role: 'staff', password: 'hashed_password_5' },
      { name: 'Staff Eko', email: 'eko@chalkboard.com', role: 'staff', password: 'hashed_password_6' },
    ];

    console.log('👤 Creating users...');
    const createdUsers = await db.insert(users).values(sampleUsers).returning();
    console.log(`✅ Created ${createdUsers.length} users`);

    // Create table sessions (last 30 days)
    const sampleTableSessions = [];
    const customerNames = [
      'Andi Wijaya', 'Siti Nurhaliza', 'Bambang Sutrisno', 'Maya Sari', 'Dedi Kurniawan',
      'Rina Dewi', 'Joko Widodo', 'Lestari Indah', 'Agus Salim', 'Putri Ayu',
      'Riko Pratama', 'Dewi Sartika', 'Fajar Nugroho', 'Linda Kartika', 'Hendra Setiawan'
    ];
    const phoneNumbers = [
      '081234567890', '081234567891', '081234567892', '081234567893', '081234567894',
      '081234567895', '081234567896', '081234567897', '081234567898', '081234567899',
      '081234567800', '081234567801', '081234567802', '081234567803', '081234567804'
    ];

    // Generate sessions for the last 30 days
    for (let day = 0; day < 30; day++) {
      const date = new Date();
      date.setDate(date.getDate() - day);
      
      // Random 2-5 sessions per day
      const sessionsPerDay = Math.floor(Math.random() * 4) + 2;
      
      for (let session = 0; session < sessionsPerDay; session++) {
        const tableId = createdTables[Math.floor(Math.random() * createdTables.length)].id;
        const customerName = customerNames[Math.floor(Math.random() * customerNames.length)];
        const customerPhone = phoneNumbers[Math.floor(Math.random() * phoneNumbers.length)];
        const staffId = createdStaff[Math.floor(Math.random() * createdStaff.length)].id;
        
        // Random start time between 10 AM and 10 PM
        const startHour = Math.floor(Math.random() * 12) + 10;
        const startMinute = Math.floor(Math.random() * 60);
        const startTime = new Date(date);
        startTime.setHours(startHour, startMinute, 0, 0);
        
        // Random duration between 1-4 hours
        const plannedDuration = (Math.floor(Math.random() * 3) + 1) * 60;
        const actualDuration = plannedDuration + Math.floor(Math.random() * 30) - 15; // ±15 minutes variance
        
        const endTime = new Date(startTime);
        endTime.setMinutes(endTime.getMinutes() + actualDuration);
        
        const hourlyRate = parseFloat(createdTables.find(t => t.id === tableId)?.hourlyRate || '50000');
        const totalCost = (hourlyRate * actualDuration) / 60;
        
        sampleTableSessions.push({
          tableId,
          customerName,
          customerPhone,
          startTime,
          endTime,
          plannedDuration,
          actualDuration,
          totalCost: totalCost.toString(),
          status: 'completed',
          staffId,
          sessionRating: Math.floor(Math.random() * 2) + 4, // 4-5 stars mostly
          fnbOrderCount: Math.floor(Math.random() * 3), // 0-2 F&B orders per session
        });
      }
    }

    console.log('🎱 Creating table sessions...');
    const createdSessions = await db.insert(tableSessions).values(sampleTableSessions).returning();
    console.log(`✅ Created ${createdSessions.length} table sessions`);

    // Create F&B orders
    const sampleOrders = [];
    const sampleOrderItems = [];
    let orderCounter = 1;

    // Create orders for about 60% of table sessions
    const sessionsWithOrders = createdSessions.filter(() => Math.random() > 0.4);
    
    for (const session of sessionsWithOrders) {
      const orderNumber = `ORD-${String(orderCounter).padStart(4, '0')}`;
      const staffId = createdStaff[Math.floor(Math.random() * createdStaff.length)].id;
      
      // Create order
      const order = {
        orderNumber,
        tableId: session.tableId,
        customerName: session.customerName,
        customerPhone: session.customerPhone,
        subtotal: '0',
        tax: '0',
        total: '0',
        status: 'paid',
        staffId,
        notes: Math.random() > 0.7 ? 'Extra ice' : null,
        createdAt: session.startTime,
      };

      sampleOrders.push(order);

      // Add 1-4 items per order
      const itemCount = Math.floor(Math.random() * 4) + 1;
      let orderSubtotal = 0;

      for (let i = 0; i < itemCount; i++) {
        const item = createdItems[Math.floor(Math.random() * createdItems.length)];
        const quantity = Math.floor(Math.random() * 3) + 1;
        const unitPrice = parseFloat(item.price);
        const subtotal = unitPrice * quantity;

        sampleOrderItems.push({
          orderId: orderCounter, // Will be updated after orders are inserted
          itemId: item.id,
          quantity,
          unitPrice: unitPrice.toString(),
          subtotal: subtotal.toString(),
        });

        orderSubtotal += subtotal;
      }

      // Update order totals
      const tax = orderSubtotal * 0.1; // 10% tax
      const total = orderSubtotal + tax;
      
      sampleOrders[sampleOrders.length - 1].subtotal = orderSubtotal.toString();
      sampleOrders[sampleOrders.length - 1].tax = tax.toString();
      sampleOrders[sampleOrders.length - 1].total = total.toString();

      orderCounter++;
    }

    console.log('🍽️ Creating F&B orders...');
    const createdOrders = await db.insert(fnbOrders).values(sampleOrders).returning();
    console.log(`✅ Created ${createdOrders.length} F&B orders`);

    // Update order items with correct order IDs
    const updatedOrderItems = sampleOrderItems.map((item, index) => {
      const orderIndex = Math.floor(index / (sampleOrderItems.length / createdOrders.length));
      return {
        ...item,
        orderId: createdOrders[Math.min(orderIndex, createdOrders.length - 1)].id,
      };
    });

    // Insert order items in batches to avoid large single inserts
    const batchSize = 50;
    const createdOrderItems = [];
    for (let i = 0; i < updatedOrderItems.length; i += batchSize) {
      const batch = updatedOrderItems.slice(i, i + batchSize);
      const batchResult = await db.insert(fnbOrderItems).values(batch).returning();
      createdOrderItems.push(...batchResult);
    }
    
    console.log(`✅ Created ${createdOrderItems.length} order items`);

    // Create payments for sessions and orders
    const samplePayments = [];
    let transactionCounter = 1;
    
    // Create payments for table sessions
    for (const session of createdSessions) {
      const transactionNumber = `TXN-${String(transactionCounter).padStart(6, '0')}`;
      const staffId = createdStaff[Math.floor(Math.random() * createdStaff.length)].id;
      
      // Find F&B order for this session if exists
      const relatedOrder = createdOrders.find(order => 
        order.tableId === session.tableId && 
        order.customerName === session.customerName
      );
      
      const tableAmount = parseFloat(session.totalCost || '0');
      const fnbAmount = relatedOrder ? parseFloat(relatedOrder.total) : 0;
      const subtotal = tableAmount + fnbAmount;
      const discountAmount = Math.random() > 0.8 ? subtotal * 0.1 : 0; // 10% discount for 20% of payments
      const taxAmount = (subtotal - discountAmount) * 0.11; // 11% tax
      const totalAmount = subtotal - discountAmount + taxAmount;
      
      const paymentMethods = [
        '["cash"]',
        '["credit_card"]', 
        '["debit_card"]',
        '["qris"]',
        '["gopay"]',
        '["ovo"]',
        '["cash", "credit_card"]' // Split payment
      ];
      
      samplePayments.push({
        transactionNumber,
        customerName: session.customerName,
        customerPhone: session.customerPhone,
        tableAmount: tableAmount.toString(),
        fnbAmount: fnbAmount.toString(),
        discountAmount: discountAmount.toString(),
        taxAmount: taxAmount.toString(),
        totalAmount: totalAmount.toString(),
        paymentMethods: paymentMethods[Math.floor(Math.random() * paymentMethods.length)],
        staffId,
        status: 'success',
        transactionId: `midtrans_${transactionCounter}`,
        midtransOrderId: `order_${transactionCounter}`,
        amount: totalAmount.toString(),
        currency: 'IDR',
        paymentMethod: ['cash', 'credit_card', 'qris', 'gopay'][Math.floor(Math.random() * 4)],
        createdAt: session.endTime,
      });
      
      transactionCounter++;
    }

    console.log('💳 Creating payments...');
    const createdPayments = await db.insert(payments).values(samplePayments).returning();
    console.log(`✅ Created ${createdPayments.length} payments`);

    // Create order analytics for dashboard insights
    const sampleAnalytics = [];
    
    for (const order of createdOrders) {
      const orderDate = new Date(order.createdAt || new Date());
      const dayOfWeek = orderDate.getDay(); // 0 = Sunday, 6 = Saturday
      const hourOfDay = orderDate.getHours();
      
      // Find related order items to calculate metrics
      const relatedItems = createdOrderItems.filter(item => item.orderId === order.id);
      const itemCount = relatedItems.reduce((sum, item) => sum + item.quantity, 0);
      
      // Processing time: 5-25 minutes randomly
      const processingTime = Math.floor(Math.random() * 20) + 5;
      
      sampleAnalytics.push({
        orderId: order.id,
        orderDate: orderDate,
        dayOfWeek,
        hourOfDay,
        orderValue: order.total,
        itemCount,
        processingTime,
      });
    }

    console.log('📊 Creating order analytics...');
    const createdAnalytics = await db.insert(orderAnalytics).values(sampleAnalytics).returning();
    console.log(`✅ Created ${createdAnalytics.length} analytics records`);

    console.log('🎉 Database seeding completed successfully!');
    return {
      tables: createdTables.length,
      categories: createdCategories.length,
      items: createdItems.length,
      staff: createdStaff.length,
      users: createdUsers.length,
      sessions: createdSessions.length,
      orders: createdOrders.length,
      orderItems: createdOrderItems.length,
      payments: createdPayments.length,
      analytics: createdAnalytics.length,
    };
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
}