import { GET, POST } from './route';
import { testApi, expectApiSuccess, expectApiError } from '@/test/utils/api';
import { getTestDatabase, cleanupDatabase, closeTestDatabase } from '@/test/utils/db';
import { mockAdminSession, mockStaffSession } from '@/test/utils/auth';
import { factories, createBulk } from '@/test/factories';
import { fnbOrders, fnbItems, fnbCategories, staff, payments } from '@/schema';
import { eq } from 'drizzle-orm';

// Mock next-auth
jest.mock('@/lib/auth', () => ({
  auth: jest.fn(),
}));

const { auth } = require('@/lib/auth');

describe('/api/fnb/orders', () => {
  let db: any;
  let testStaff: any;
  let testCategory: any;
  let testMenuItem: any;

  beforeAll(async () => {
    db = await getTestDatabase();
  });

  beforeEach(async () => {
    await cleanupDatabase();
    auth.mockResolvedValue(mockAdminSession);

    // Create test staff
    testStaff = factories.staff({
      role: 'STAFF',
    });
    const [insertedStaff] = await db.insert(staff).values(testStaff).returning();
    testStaff.id = insertedStaff.id;

    // Create test category
    testCategory = factories.fnbCategory({
      name: 'Beverages',
    });
    await db.insert(fnbCategories).values(testCategory);

    // Create test menu item
    testMenuItem = factories.fnbMenuItem({
      name: 'Coffee',
      categoryId: testCategory.id,
      price: '25000.00',
      stockQuantity: 100,
    });
    const [insertedItem] = await db.insert(fnbItems).values(testMenuItem).returning();
    testMenuItem.id = insertedItem.id;
  });

  afterAll(async () => {
    await closeTestDatabase();
  });

  describe('GET /api/fnb/orders', () => {
    it('should return 401 when not authenticated', async () => {
      auth.mockResolvedValue(null);
      
      const response = await testApi.get(GET, 'http://localhost:3000/api/fnb/orders', null);
      expectApiError(response, 401, 'Unauthorized');
    });

    it('should return empty array when no orders exist', async () => {
      const response = await testApi.get(GET, 'http://localhost:3000/api/fnb/orders');
      
      expectApiSuccess(response);
      expect(response.data).toEqual([]);
    });

    it('should return all orders when no status filter', async () => {
      await createBulk(db, fnbOrders, factories.fnbOrder, 3, {
        staffId: testStaff.id,
      });

      const response = await testApi.get(GET, 'http://localhost:3000/api/fnb/orders');
      
      expectApiSuccess(response);
      expect(response.data).toHaveLength(3);
    });

    it('should filter orders by status', async () => {
      await createBulk(db, fnbOrders, factories.fnbOrder, 2, {
        status: 'pending',
        staffId: testStaff.id,
      });
      await createBulk(db, fnbOrders, factories.fnbOrder, 1, {
        status: 'completed',
        staffId: testStaff.id,
      });

      const response = await testApi.get(GET, 'http://localhost:3000/api/fnb/orders?status=pending');
      
      expectApiSuccess(response);
      expect(response.data).toHaveLength(2);
      expect(response.data.every(order => order.status === 'pending')).toBe(true);
    });

    it('should limit orders when limit parameter provided', async () => {
      await createBulk(db, fnbOrders, factories.fnbOrder, 5, {
        staffId: testStaff.id,
      });

      const response = await testApi.get(GET, 'http://localhost:3000/api/fnb/orders?limit=3');
      
      expectApiSuccess(response);
      expect(response.data).toHaveLength(3);
    });
  });

  describe('POST /api/fnb/orders', () => {
    const validOrderData = {
      context: 'standalone',
      customerName: 'John Doe',
      customerPhone: '081234567890',
      staffId: 1,
      subtotal: 50000,
      tax: 5000,
      total: 55000,
      notes: 'No sugar',
      items: [
        {
          itemId: 1,
          quantity: 2,
          unitPrice: 25000,
          subtotal: 50000,
        }
      ]
    };

    beforeEach(() => {
      validOrderData.staffId = testStaff.id;
      validOrderData.items[0].itemId = testMenuItem.id;
    });

    it('should return 401 when not authenticated', async () => {
      auth.mockResolvedValue(null);
      
      const response = await testApi.post(
        POST,
        'http://localhost:3000/api/fnb/orders',
        validOrderData,
        null
      );
      
      expectApiError(response, 401, 'Unauthorized');
    });

    it('should return 400 when required fields are missing', async () => {
      const invalidData = { ...validOrderData };
      delete invalidData.customerName;

      const response = await testApi.post(
        POST,
        'http://localhost:3000/api/fnb/orders',
        invalidData
      );
      
      expectApiError(response, 400, 'Customer name, subtotal, total, items, and staff ID are required');
    });

    it('should return 400 when table ID missing for table session context', async () => {
      const tableOrderData = {
        ...validOrderData,
        context: 'table_session',
      };

      const response = await testApi.post(
        POST,
        'http://localhost:3000/api/fnb/orders',
        tableOrderData
      );
      
      expectApiError(response, 400, 'Table ID is required for table session orders');
    });

    it('should create standalone order successfully', async () => {
      const response = await testApi.post(
        POST,
        'http://localhost:3000/api/fnb/orders',
        validOrderData
      );
      
      expectApiSuccess(response, 201);
      expect(response.data).toMatchObject({
        orderNumber: expect.stringMatching(/^FNB-/),
        customerName: 'John Doe',
        customerPhone: '081234567890',
        subtotal: '50000',
        tax: '5000',
        total: '55000',
        status: 'billed', // Standalone orders are automatically billed
        notes: 'No sugar',
        context: 'standalone',
        paymentRecord: expect.objectContaining({
          id: expect.any(Number),
          transactionNumber: expect.any(String),
          status: 'pending',
        }),
      });

      // Verify payment record was created
      const paymentRecords = await db.select().from(payments)
        .where(eq(payments.id, response.data.paymentRecord.id));
      expect(paymentRecords).toHaveLength(1);
      expect(paymentRecords[0]).toMatchObject({
        customerName: 'John Doe',
        fnbAmount: '55000',
        totalAmount: '55000',
        status: 'pending',
      });
    });

    it('should create draft order for waiting context', async () => {
      const draftData = {
        ...validOrderData,
        context: 'waiting',
      };

      const response = await testApi.post(
        POST,
        'http://localhost:3000/api/fnb/orders',
        draftData
      );
      
      expectApiSuccess(response, 201);
      expect(response.data).toMatchObject({
        orderNumber: expect.stringMatching(/^DRAFT-/),
        status: 'draft',
        context: 'waiting',
        paymentRecord: null, // No payment for draft orders
      });

      // Verify stock was not reduced for draft orders
      const updatedItem = await db.select().from(fnbMenuItems)
        .where(eq(fnbMenuItems.id, testMenuItem.id))
        .limit(1);
      expect(updatedItem[0].stockQuantity).toBe(100); // Original stock unchanged
    });

    it('should create table session order successfully', async () => {
      const tableOrderData = {
        ...validOrderData,
        context: 'table_session',
        tableId: 1,
      };

      const response = await testApi.post(
        POST,
        'http://localhost:3000/api/fnb/orders',
        tableOrderData
      );
      
      expectApiSuccess(response, 201);
      expect(response.data).toMatchObject({
        orderNumber: expect.stringMatching(/^TABLE-/),
        tableId: 1,
        status: 'pending',
        context: 'table_session',
        paymentRecord: null, // Table orders don't auto-create payments
      });

      // Verify stock was reduced
      const updatedItem = await db.select().from(fnbItems)
        .where(eq(fnbItems.id, testMenuItem.id))
        .limit(1);
      expect(updatedItem[0].stockQuantity).toBe(98); // 100 - 2
    });

    it('should handle multiple items in order', async () => {
      const multiItemData = {
        ...validOrderData,
        items: [
          {
            itemId: testMenuItem.id,
            quantity: 1,
            unitPrice: 25000,
            subtotal: 25000,
          },
          {
            itemId: testMenuItem.id,
            quantity: 3,
            unitPrice: 25000,
            subtotal: 75000,
          }
        ],
        subtotal: 100000,
        total: 100000,
      };

      const response = await testApi.post(
        POST,
        'http://localhost:3000/api/fnb/orders',
        multiItemData
      );
      
      expectApiSuccess(response, 201);
      
      // Verify stock reduction for total quantity (1 + 3 = 4)
      const updatedItem = await db.select().from(fnbItems)
        .where(eq(fnbItems.id, testMenuItem.id))
        .limit(1);
      expect(updatedItem[0].stockQuantity).toBe(96); // 100 - 4
    });

    it('should prevent negative stock', async () => {
      // Update item to have low stock
      await db.update(fnbItems)
        .set({ stockQuantity: 1 })
        .where(eq(fnbItems.id, testMenuItem.id));

      const largeOrderData = {
        ...validOrderData,
        items: [
          {
            itemId: testMenuItem.id,
            quantity: 5, // More than available stock
            unitPrice: 25000,
            subtotal: 125000,
          }
        ],
      };

      const response = await testApi.post(
        POST,
        'http://localhost:3000/api/fnb/orders',
        largeOrderData
      );
      
      expectApiSuccess(response, 201);
      
      // Verify stock doesn't go negative
      const updatedItem = await db.select().from(fnbItems)
        .where(eq(fnbItems.id, testMenuItem.id))
        .limit(1);
      expect(updatedItem[0].stockQuantity).toBe(0); // Should be 0, not negative
    });

    it('should allow staff to create orders', async () => {
      auth.mockResolvedValue(mockStaffSession);
      
      const response = await testApi.post(
        POST,
        'http://localhost:3000/api/fnb/orders',
        validOrderData,
        mockStaffSession
      );
      
      expectApiSuccess(response, 201);
      expect(response.data.customerName).toBe('John Doe');
    });
  });
});