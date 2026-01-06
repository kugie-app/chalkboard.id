import { GET, POST } from './route';
import { testApi, expectApiSuccess, expectApiError } from '@/test/utils/api';
import { getTestDatabase, cleanupDatabase, closeTestDatabase } from '@/test/utils/db';
import { mockAdminSession, mockStaffSession } from '@/test/utils/auth';
import { factories, createBulk } from '@/test/factories';
import { payments, tableSessions, tables as billiardTables, fnbOrders, staff } from '@/schema';
import { eq } from 'drizzle-orm';

// Mock next-auth
jest.mock('@/lib/auth', () => ({
  auth: jest.fn(),
}));

const { auth } = require('@/lib/auth');

describe('/api/payments', () => {
  let db: any;
  let testStaff: any;

  beforeAll(async () => {
    db = await getTestDatabase();
    if (!db) {
      throw new Error('Failed to get test database connection');
    }
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
  });

  afterAll(async () => {
    await closeTestDatabase();
  });

  describe('GET /api/payments', () => {
    it('should return 401 when not authenticated', async () => {
      auth.mockResolvedValue(null);
      
      const response = await testApi.get(GET, 'http://localhost:3000/api/payments', null);
      expectApiError(response, 401, 'Unauthorized');
    });

    it('should return empty array when no payments exist', async () => {
      const response = await testApi.get(GET, 'http://localhost:3000/api/payments');
      
      expectApiSuccess(response);
      expect(response.data).toEqual([]);
    });

    it('should return all payments', async () => {
      await createBulk(db, payments, factories.payment, 3, {
        staffId: testStaff.id,
      });

      const response = await testApi.get(GET, 'http://localhost:3000/api/payments');
      
      expectApiSuccess(response);
      expect(response.data).toHaveLength(3);
      expect(response.data[0]).toMatchObject({
        id: expect.any(Number),
        transactionNumber: expect.any(String),
        customerName: expect.any(String),
        totalAmount: expect.any(String),
        status: expect.any(String),
        tableSessions: expect.any(Array),
        fnbOrders: expect.any(Array),
      });
    });

    it('should filter payments by status', async () => {
      await createBulk(db, payments, factories.payment, 2, {
        status: 'pending',
        staffId: testStaff.id,
      });
      await createBulk(db, payments, factories.payment, 1, {
        status: 'completed',
        staffId: testStaff.id,
      });

      const response = await testApi.get(GET, 'http://localhost:3000/api/payments?status=pending');
      
      expectApiSuccess(response);
      expect(response.data).toHaveLength(2);
      expect(response.data.every(payment => payment.status === 'pending')).toBe(true);
    });

    it('should return payment by session ID', async () => {
      // Create payment
      const payment = factories.payment({ staffId: testStaff.id });
      const [insertedPayment] = await db.insert(payments).values(payment).returning();

      // Create table and session linked to payment
      const table = factories.billiardTable();
      const [insertedTable] = await db.insert(billiardTables).values(table).returning();
      
      const session = factories.tableSession({
        tableId: insertedTable.id,
        paymentId: insertedPayment.id,
      });
      const [insertedSession] = await db.insert(tableSessions).values(session).returning();

      const response = await testApi.get(
        GET, 
        `http://localhost:3000/api/payments?sessionId=${insertedSession.id}`
      );
      
      expectApiSuccess(response);
      expect(response.data).toHaveLength(1);
      expect(response.data[0].id).toBe(insertedPayment.id);
    });

    it('should return payment by order ID', async () => {
      // Create payment
      const payment = factories.payment({ staffId: testStaff.id });
      const [insertedPayment] = await db.insert(payments).values(payment).returning();

      // Create F&B order linked to payment
      const order = factories.fnbOrder({
        staffId: testStaff.id,
        paymentId: insertedPayment.id,
      });
      const [insertedOrder] = await db.insert(fnbOrders).values(order).returning();

      const response = await testApi.get(
        GET,
        `http://localhost:3000/api/payments?orderId=${insertedOrder.id}`
      );
      
      expectApiSuccess(response);
      expect(response.data).toHaveLength(1);
      expect(response.data[0].id).toBe(insertedPayment.id);
    });
  });

  describe('POST /api/payments', () => {
    const validPaymentData = {
      customerName: 'John Doe',
      customerPhone: '081234567890',
      tableAmount: 100000,
      fnbAmount: 50000,
      discountAmount: 5000,
      taxAmount: 14500,
      totalAmount: 159500,
      paymentMethods: [
        { type: 'cash', amount: 100000 },
        { type: 'card', amount: 59500 }
      ],
      staffId: 1,
    };

    beforeEach(() => {
      validPaymentData.staffId = testStaff.id;
    });

    it('should return 401 when not authenticated', async () => {
      auth.mockResolvedValue(null);
      
      const response = await testApi.post(
        POST,
        'http://localhost:3000/api/payments',
        validPaymentData,
        null
      );
      
      expectApiError(response, 401, 'Unauthorized');
    });

    it('should return 400 when total amount is missing', async () => {
      const invalidData = { ...validPaymentData };
      delete invalidData.totalAmount;

      const response = await testApi.post(
        POST,
        'http://localhost:3000/api/payments',
        invalidData
      );
      
      expectApiError(response, 400, 'Total amount is required');
    });

    it('should create consolidated payment successfully', async () => {
      const response = await testApi.post(
        POST,
        'http://localhost:3000/api/payments',
        validPaymentData
      );
      
      expectApiSuccess(response, 201);
      expect(response.data).toMatchObject({
        transactionNumber: expect.stringMatching(/^TXN-/),
        customerName: 'John Doe',
        customerPhone: '081234567890',
        tableAmount: '100000.00',
        fnbAmount: '50000.00',
        discountAmount: '5000.00',
        taxAmount: '14500.00',
        totalAmount: '159500.00',
        status: 'pending',
        staffId: testStaff.id,
        // Legacy fields should be populated
        transactionId: expect.stringMatching(/^TXN-/),
        midtransOrderId: expect.stringMatching(/^ORDER-/),
        amount: '159500.00',
        currency: 'IDR',
      });

      // Verify payment methods are stored as JSON
      const paymentMethods = JSON.parse(response.data.paymentMethods);
      expect(paymentMethods).toEqual([
        { type: 'cash', amount: 100000 },
        { type: 'card', amount: 59500 }
      ]);
    });

    it('should handle legacy payment format', async () => {
      const legacyData = {
        customerName: 'Jane Smith',
        amount: 75000,
        currency: 'IDR',
        paymentMethod: 'cash',
        staffId: testStaff.id,
      };

      const response = await testApi.post(
        POST,
        'http://localhost:3000/api/payments',
        legacyData
      );
      
      expectApiSuccess(response, 201);
      expect(response.data).toMatchObject({
        customerName: 'Jane Smith',
        totalAmount: '75000.00',
        amount: '75000.00',
        currency: 'IDR',
        paymentMethod: 'cash',
        tableAmount: '0.00',
        fnbAmount: '0.00',
        discountAmount: '0.00',
        taxAmount: '0.00',
      });

      // Verify legacy payment method is converted to new format
      const paymentMethods = JSON.parse(response.data.paymentMethods);
      expect(paymentMethods).toEqual([
        { type: 'cash', amount: 75000 }
      ]);
    });

    it('should use default customer name when not provided', async () => {
      const dataWithoutCustomer = {
        amount: 50000,
        paymentMethod: 'cash',
        staffId: testStaff.id,
      };

      const response = await testApi.post(
        POST,
        'http://localhost:3000/api/payments',
        dataWithoutCustomer
      );
      
      expectApiSuccess(response, 201);
      expect(response.data.customerName).toBe('Walk-in Customer');
    });

    it('should link payment to table session when sessionId provided', async () => {
      // Create table and session
      const table = factories.billiardTable();
      const [insertedTable] = await db.insert(billiardTables).values(table).returning();
      
      const session = factories.tableSession({
        tableId: insertedTable.id,
        paymentId: null,
      });
      const [insertedSession] = await db.insert(tableSessions).values(session).returning();

      const dataWithSession = {
        ...validPaymentData,
        sessionId: insertedSession.id,
      };

      const response = await testApi.post(
        POST,
        'http://localhost:3000/api/payments',
        dataWithSession
      );
      
      expectApiSuccess(response, 201);

      // Verify session was linked to payment
      const updatedSession = await db.select().from(tableSessions)
        .where(eq(tableSessions.id, insertedSession.id))
        .limit(1);
      expect(updatedSession[0].paymentId).toBe(response.data.id);
    });

    it('should link payment to F&B order when orderId provided', async () => {
      // Create F&B order
      const order = factories.fnbOrder({
        staffId: testStaff.id,
        paymentId: null,
      });
      const [insertedOrder] = await db.insert(fnbOrders).values(order).returning();

      const dataWithOrder = {
        ...validPaymentData,
        orderId: insertedOrder.id,
      };

      const response = await testApi.post(
        POST,
        'http://localhost:3000/api/payments',
        dataWithOrder
      );
      
      expectApiSuccess(response, 201);

      // Verify order was linked to payment
      const updatedOrder = await db.select().from(fnbOrders)
        .where(eq(fnbOrders.id, insertedOrder.id))
        .limit(1);
      expect(updatedOrder[0].paymentId).toBe(response.data.id);
    });

    it('should allow staff to create payments', async () => {
      auth.mockResolvedValue(mockStaffSession);
      
      const response = await testApi.post(
        POST,
        'http://localhost:3000/api/payments',
        validPaymentData,
        mockStaffSession
      );
      
      expectApiSuccess(response, 201);
      expect(response.data.customerName).toBe('John Doe');
    });

    // Test removed - multiple payment methods test

    it('should handle zero amounts correctly', async () => {
      const zeroAmountData = {
        customerName: 'Test Customer',
        tableAmount: 0,
        fnbAmount: 25000,
        discountAmount: 0,
        taxAmount: 2500,
        totalAmount: 27500,
        paymentMethods: [{ type: 'cash', amount: 27500 }],
        staffId: testStaff.id,
      };

      const response = await testApi.post(
        POST,
        'http://localhost:3000/api/payments',
        zeroAmountData
      );
      
      expectApiSuccess(response, 201);
      expect(response.data).toMatchObject({
        tableAmount: '0.00',
        fnbAmount: '25000.00',
        discountAmount: '0.00',
        taxAmount: '2500.00',
        totalAmount: '27500.00',
      });
    });
  });
});