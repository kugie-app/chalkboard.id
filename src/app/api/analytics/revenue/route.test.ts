import { GET } from './route';
import { testApi, expectApiSuccess, expectApiError } from '@/test/utils/api';
import { getTestDatabase, cleanupDatabase, closeTestDatabase } from '@/test/utils/db';
import { mockAdminSession, mockStaffSession } from '@/test/utils/auth';
import { factories, createBulk } from '@/test/factories';
import { tables as billiardTables, tableSessions, fnbOrders, fnbItems, fnbCategories, fnbOrderItems, payments } from '@/schema';

// Mock next-auth
jest.mock('@/lib/auth', () => ({
  auth: jest.fn(),
}));

const { auth } = require('@/lib/auth');

describe('/api/analytics/revenue', () => {
  let db: any;
  let testTable: any;
  let testMenuItem: any;

  beforeAll(async () => {
    db = await getTestDatabase();
  });

  beforeEach(async () => {
    await cleanupDatabase();
    auth.mockResolvedValue(mockAdminSession);

    // Create test table
    testTable = factories.billiardTable({
      name: 'Test Table 1',
      hourlyRate: '50000.00',
      isActive: true,
    });
    const [insertedTable] = await db.insert(billiardTables).values(testTable).returning();
    testTable.id = insertedTable.id;

    // Create test category and menu item
    const testCategory = factories.fnbCategory({ name: 'Test Category' });
    await db.insert(fnbCategories).values(testCategory);

    testMenuItem = factories.fnbMenuItem({
      name: 'Test Item',
      categoryId: testCategory.id,
      price: '25000.00',
    });
    const [insertedMenuItem] = await db.insert(fnbItems).values(testMenuItem).returning();
    testMenuItem.id = insertedMenuItem.id;
  });

  afterAll(async () => {
    await closeTestDatabase();
  });

  describe('GET /api/analytics/revenue', () => {
    it('should return 401 when not authenticated', async () => {
      auth.mockResolvedValue(null);
      
      const response = await testApi.get(GET, 'http://localhost:3000/api/analytics/revenue', null);
      expectApiError(response, 401, 'Unauthorized');
    });

    it('should return revenue data with default parameters', async () => {
      const response = await testApi.get(GET, 'http://localhost:3000/api/analytics/revenue');
      
      expectApiSuccess(response);
      expect(response.data).toMatchObject({
        period: expect.objectContaining({
          startDate: expect.any(String),
          endDate: expect.any(String),
          days: 30,
        }),
        summary: expect.objectContaining({
          tableRevenue: expect.any(Number),
          fnbRevenue: expect.any(Number),
          totalRevenue: expect.any(Number),
          tableSessions: expect.any(Number),
          fnbOrders: expect.any(Number),
        }),
        dailyRevenue: expect.any(Array),
        tableRevenue: expect.any(Array),
        paymentMethods: expect.any(Array),
        topSellingItems: expect.any(Array),
        hourlyRevenue: expect.any(Array),
      });
    });

    it('should return zero revenue when no data exists', async () => {
      const response = await testApi.get(GET, 'http://localhost:3000/api/analytics/revenue');
      
      expectApiSuccess(response);
      expect(response.data.summary).toMatchObject({
        tableRevenue: 0,
        fnbRevenue: 0,
        totalRevenue: 0,
        tableSessions: 0,
        fnbOrders: 0,
      });
      expect(response.data.dailyRevenue).toHaveLength(31); // 30 days + 1
    });

    it('should calculate table revenue correctly', async () => {
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);

      // Create table sessions with different costs
      await db.insert(tableSessions).values([
        factories.tableSession({
          tableId: testTable.id,
          totalCost: '100000.00',
          createdAt: today,
          startTime: today,
        }),
        factories.tableSession({
          tableId: testTable.id,
          totalCost: '75000.00',
          createdAt: yesterday,
          startTime: yesterday,
        }),
      ]);

      const response = await testApi.get(GET, 'http://localhost:3000/api/analytics/revenue');
      
      expectApiSuccess(response);
      expect(response.data.summary.tableRevenue).toBe(175000);
      expect(response.data.summary.tableSessions).toBe(2);
      expect(response.data.summary.totalRevenue).toBe(175000);
    });

    it('should calculate F&B revenue correctly', async () => {
      const today = new Date();
      
      // Create F&B orders
      const order1 = factories.fnbOrder({
        total: '50000.00',
        createdAt: today,
      });
      const [insertedOrder1] = await db.insert(fnbOrders).values(order1).returning();

      const order2 = factories.fnbOrder({
        total: '30000.00',
        createdAt: today,
      });
      const [insertedOrder2] = await db.insert(fnbOrders).values(order2).returning();

      // Create order items for top selling analysis
      await db.insert(fnbOrderItems).values([
        factories.orderItem({
          orderId: insertedOrder1.id,
          menuItemId: testMenuItem.id,
          quantity: 2,
          unitPrice: '25000.00',
          subtotal: '50000.00',
        }),
        factories.orderItem({
          orderId: insertedOrder2.id,
          menuItemId: testMenuItem.id,
          quantity: 1,
          unitPrice: '30000.00',
          subtotal: '30000.00',
        }),
      ]);

      const response = await testApi.get(GET, 'http://localhost:3000/api/analytics/revenue');
      
      expectApiSuccess(response);
      expect(response.data.summary.fnbRevenue).toBe(80000);
      expect(response.data.summary.fnbOrders).toBe(2);
      expect(response.data.summary.totalRevenue).toBe(80000);
      
      // Check top selling items
      expect(response.data.topSellingItems).toHaveLength(1);
      expect(response.data.topSellingItems[0]).toMatchObject({
        itemId: testMenuItem.id,
        itemName: 'Test Item',
        totalQuantity: 3,
        totalRevenue: 80000,
        orderCount: 2,
      });
    });

    it('should calculate combined table and F&B revenue correctly', async () => {
      const today = new Date();

      // Create table session
      await db.insert(tableSessions).values(
        factories.tableSession({
          tableId: testTable.id,
          totalCost: '100000.00',
          createdAt: today,
          startTime: today,
        })
      );

      // Create F&B order
      await db.insert(fnbOrders).values(
        factories.fnbOrder({
          total: '50000.00',
          createdAt: today,
        })
      );

      const response = await testApi.get(GET, 'http://localhost:3000/api/analytics/revenue');
      
      expectApiSuccess(response);
      expect(response.data.summary).toMatchObject({
        tableRevenue: 100000,
        fnbRevenue: 50000,
        totalRevenue: 150000,
        tableSessions: 1,
        fnbOrders: 1,
      });
    });

    it('should filter data by date range', async () => {
      const today = new Date();
      const oldDate = new Date();
      oldDate.setDate(oldDate.getDate() - 40); // Outside default 30-day range

      // Create recent session
      await db.insert(tableSessions).values(
        factories.tableSession({
          tableId: testTable.id,
          totalCost: '100000.00',
          createdAt: today,
          startTime: today,
        })
      );

      // Create old session (should be filtered out)
      await db.insert(tableSessions).values(
        factories.tableSession({
          tableId: testTable.id,
          totalCost: '50000.00',
          createdAt: oldDate,
          startTime: oldDate,
        })
      );

      const response = await testApi.get(GET, 'http://localhost:3000/api/analytics/revenue');
      
      expectApiSuccess(response);
      expect(response.data.summary.tableRevenue).toBe(100000); // Only recent session
      expect(response.data.summary.tableSessions).toBe(1);
    });

    it('should support custom date range', async () => {
      const customDate = new Date('2024-01-15');
      const response = await testApi.get(
        GET,
        `http://localhost:3000/api/analytics/revenue?date=2024-01-15&days=7`
      );
      
      expectApiSuccess(response);
      expect(response.data.period.days).toBe(7);
      expect(response.data.period.endDate).toBe('2024-01-15');
      expect(response.data.dailyRevenue).toHaveLength(8); // 7 days + 1
    });

    it('should support weekly period grouping', async () => {
      const response = await testApi.get(
        GET,
        'http://localhost:3000/api/analytics/revenue?period=weekly'
      );
      
      expectApiSuccess(response);
      expect(response.data.dailyRevenue.length).toBeGreaterThan(0);
      // Check that dates align to week starts (Sunday)
      response.data.dailyRevenue.forEach(week => {
        const date = new Date(week.date);
        expect(date.getDay()).toBe(0); // Sunday
      });
    });

    it('should support monthly period grouping', async () => {
      const response = await testApi.get(
        GET,
        'http://localhost:3000/api/analytics/revenue?period=monthly'
      );
      
      expectApiSuccess(response);
      expect(response.data.dailyRevenue.length).toBeGreaterThan(0);
      // Check that dates are first of month
      response.data.dailyRevenue.forEach(month => {
        const date = new Date(month.date);
        expect(date.getDate()).toBe(1);
      });
    });

    it('should include table-specific revenue breakdown', async () => {
      await db.insert(tableSessions).values([
        factories.tableSession({
          tableId: testTable.id,
          totalCost: '100000.00',
          actualDuration: 120, // 2 hours
        }),
        factories.tableSession({
          tableId: testTable.id,
          totalCost: '75000.00',
          actualDuration: 90, // 1.5 hours
        }),
      ]);

      const response = await testApi.get(GET, 'http://localhost:3000/api/analytics/revenue');
      
      expectApiSuccess(response);
      expect(response.data.tableRevenue).toHaveLength(1);
      expect(response.data.tableRevenue[0]).toMatchObject({
        tableId: testTable.id,
        tableName: 'Test Table 1',
        totalRevenue: 175000,
        totalSessions: 2,
        totalHours: 3.5, // 2 + 1.5 hours
        hourlyRate: '50000.00',
      });
    });

    it('should include hourly revenue distribution', async () => {
      const response = await testApi.get(GET, 'http://localhost:3000/api/analytics/revenue');
      
      expectApiSuccess(response);
      expect(response.data.hourlyRevenue).toHaveLength(24);
      
      // Check that all hours are represented
      for (let hour = 0; hour < 24; hour++) {
        expect(response.data.hourlyRevenue[hour]).toMatchObject({
          hour,
          tableRevenue: expect.any(Number),
          fnbRevenue: expect.any(Number),
          totalRevenue: expect.any(Number),
        });
      }
    });

    it('should include payment method breakdown', async () => {
      const today = new Date();
      
      // Create payments with different methods
      await db.insert(payments).values([
        factories.payment({
          amount: '100000.00',
          paymentMethod: 'cash',
          status: 'success',
          createdAt: today,
        }),
        factories.payment({
          amount: '75000.00',
          paymentMethod: 'card',
          status: 'success',
          createdAt: today,
        }),
        factories.payment({
          amount: '50000.00',
          paymentMethod: 'cash',
          status: 'pending',
          createdAt: today,
        }),
      ]);

      const response = await testApi.get(GET, 'http://localhost:3000/api/analytics/revenue');
      
      expectApiSuccess(response);
      expect(response.data.paymentMethods.length).toBeGreaterThan(0);
      
      const cashPayments = response.data.paymentMethods.find(pm => pm.paymentMethod === 'cash');
      expect(cashPayments).toMatchObject({
        paymentMethod: 'cash',
        totalAmount: 150000,
        transactionCount: 2,
        successRate: 50, // 1 out of 2 cash payments successful
      });

      const cardPayments = response.data.paymentMethods.find(pm => pm.paymentMethod === 'card');
      expect(cardPayments).toMatchObject({
        paymentMethod: 'card',
        totalAmount: 75000,
        transactionCount: 1,
        successRate: 100,
      });
    });

    it('should allow staff to access revenue data', async () => {
      auth.mockResolvedValue(mockStaffSession);
      
      const response = await testApi.get(GET, 'http://localhost:3000/api/analytics/revenue', mockStaffSession);
      
      expectApiSuccess(response);
      expect(response.data.summary).toBeDefined();
    });
  });
});