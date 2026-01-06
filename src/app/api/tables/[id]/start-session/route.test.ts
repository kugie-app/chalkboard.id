import { POST } from './route';
import { testApi, expectApiSuccess, expectApiError } from '@/test/utils/api';
import { getTestDatabase, cleanupDatabase, closeTestDatabase } from '@/test/utils/db';
import { mockAdminSession, mockStaffSession } from '@/test/utils/auth';
import { factories } from '@/test/factories';
import { tables as billiardTables, pricingPackages, tableSessions } from '@/schema';
import { eq } from 'drizzle-orm';

// Mock next-auth
jest.mock('@/lib/auth', () => ({
  auth: jest.fn(),
}));

const { auth } = require('@/lib/auth');

describe('/api/tables/[id]/start-session', () => {
  let db: any;
  let testTable: any;
  let testPricingPackage: any;

  beforeAll(async () => {
    db = await getTestDatabase();
  });

  beforeEach(async () => {
    await cleanupDatabase();
    auth.mockResolvedValue(mockAdminSession);

    // Create test pricing package
    testPricingPackage = factories.pricingPackage({
      name: 'Standard Hourly',
      category: 'hourly',
      hourlyRate: '50000.00',
      perMinuteRate: '1000.00',
    });
    await db.insert(pricingPackages).values(testPricingPackage);

    // Create test table
    testTable = factories.billiardTable({
      name: 'Table 1',
      status: 'available',
      isActive: true,
    });
    const [insertedTable] = await db.insert(billiardTables).values(testTable).returning();
    testTable.id = insertedTable.id;
  });

  afterAll(async () => {
    await closeTestDatabase();
  });

  describe('POST /api/tables/[id]/start-session', () => {
    it('should return 401 when not authenticated', async () => {
      auth.mockResolvedValue(null);
      
      const response = await testApi.post(
        POST,
        `http://localhost:3000/api/tables/${testTable.id}/start-session`,
        { customerName: 'John Doe', pricingPackageId: testPricingPackage.id },
        null
      );
      
      expectApiError(response, 401, 'Unauthorized');
    });

    it('should return 400 when customer name is missing', async () => {
      const response = await testApi.post(
        POST,
        `http://localhost:3000/api/tables/${testTable.id}/start-session`,
        { pricingPackageId: testPricingPackage.id }
      );
      
      expectApiError(response, 400, 'Customer name is required');
    });

    it('should return 400 when pricing package is missing', async () => {
      const response = await testApi.post(
        POST,
        `http://localhost:3000/api/tables/${testTable.id}/start-session`,
        { customerName: 'John Doe' }
      );
      
      expectApiError(response, 400, 'Pricing package is required');
    });

    it('should return 400 when planned duration is missing in planned mode', async () => {
      const response = await testApi.post(
        POST,
        `http://localhost:3000/api/tables/${testTable.id}/start-session`,
        { 
          customerName: 'John Doe',
          mode: 'planned',
          pricingPackageId: testPricingPackage.id
        }
      );
      
      expectApiError(response, 400, 'Planned duration is required for planned mode');
    });

    it('should return 404 when table does not exist', async () => {
      const response = await testApi.post(
        POST,
        'http://localhost:3000/api/tables/99999/start-session',
        { 
          customerName: 'John Doe',
          pricingPackageId: testPricingPackage.id
        }
      );
      
      expectApiError(response, 404, 'Table not found');
    });

    it('should return 400 when table is not available', async () => {
      // Update table status to occupied
      await db.update(billiardTables)
        .set({ status: 'occupied' })
        .where(eq(billiardTables.id, testTable.id));

      const response = await testApi.post(
        POST,
        `http://localhost:3000/api/tables/${testTable.id}/start-session`,
        { 
          customerName: 'John Doe',
          pricingPackageId: testPricingPackage.id
        }
      );
      
      expectApiError(response, 400, 'Table is not available');
    });

    it('should start an open session successfully', async () => {
      const response = await testApi.post(
        POST,
        `http://localhost:3000/api/tables/${testTable.id}/start-session`,
        { 
          customerName: 'John Doe',
          mode: 'open',
          pricingPackageId: testPricingPackage.id
        }
      );
      
      expectApiSuccess(response, 201);
      expect(response.data).toMatchObject({
        tableId: testTable.id,
        customerName: 'John Doe',
        plannedDuration: 0,
        durationType: 'hourly',
        pricingPackageId: testPricingPackage.id,
        status: 'active',
      });

      // Verify table status was updated
      const updatedTable = await db.select().from(billiardTables)
        .where(eq(billiardTables.id, testTable.id))
        .limit(1);
      expect(updatedTable[0].status).toBe('occupied');
    });

    it('should start a planned session successfully', async () => {
      const response = await testApi.post(
        POST,
        `http://localhost:3000/api/tables/${testTable.id}/start-session`,
        { 
          customerName: 'Jane Smith',
          mode: 'planned',
          plannedDuration: 120,
          pricingPackageId: testPricingPackage.id
        }
      );
      
      expectApiSuccess(response, 201);
      expect(response.data).toMatchObject({
        customerName: 'Jane Smith',
        plannedDuration: 120,
        durationType: 'hourly',
        status: 'active',
      });
    });

    it('should use per_minute duration type for per_minute pricing package', async () => {
      // Create per_minute pricing package
      const perMinutePackage = factories.pricingPackage({
        name: 'Per Minute',
        category: 'per_minute',
        perMinuteRate: '1000.00',
      });
      await db.insert(pricingPackages).values(perMinutePackage);

      const response = await testApi.post(
        POST,
        `http://localhost:3000/api/tables/${testTable.id}/start-session`,
        { 
          customerName: 'John Doe',
          pricingPackageId: perMinutePackage.id
        }
      );
      
      expectApiSuccess(response, 201);
      expect(response.data.durationType).toBe('per_minute');
    });

    it('should allow staff to start sessions', async () => {
      auth.mockResolvedValue(mockStaffSession);
      
      const response = await testApi.post(
        POST,
        `http://localhost:3000/api/tables/${testTable.id}/start-session`,
        { 
          customerName: 'Staff Customer',
          pricingPackageId: testPricingPackage.id
        },
        mockStaffSession
      );
      
      expectApiSuccess(response, 201);
      expect(response.data.customerName).toBe('Staff Customer');
    });

    it('should not allow multiple active sessions on same table', async () => {
      // Start first session
      await testApi.post(
        POST,
        `http://localhost:3000/api/tables/${testTable.id}/start-session`,
        { 
          customerName: 'First Customer',
          pricingPackageId: testPricingPackage.id
        }
      );

      // Try to start second session
      const response = await testApi.post(
        POST,
        `http://localhost:3000/api/tables/${testTable.id}/start-session`,
        { 
          customerName: 'Second Customer',
          pricingPackageId: testPricingPackage.id
        }
      );
      
      expectApiError(response, 400, 'Table is not available');
    });
  });
});