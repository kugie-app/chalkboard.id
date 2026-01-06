import { GET, POST } from './route';
import { testApi, expectApiSuccess, expectApiError } from '@/test/utils/api';
import { getTestDatabase, cleanupDatabase, closeTestDatabase } from '@/test/utils/db';
import { mockAdminSession, mockStaffSession } from '@/test/utils/auth';
import { factories, createBulk } from '@/test/factories';
import { tables as billiardTables, pricingPackages } from '@/schema';

// Mock next-auth
jest.mock('@/lib/auth', () => ({
  auth: jest.fn(),
}));

const { auth } = require('@/lib/auth');

describe('/api/tables', () => {
  let db: any;

  beforeAll(async () => {
    db = await getTestDatabase();
    if (!db) {
      throw new Error('Failed to get test database connection');
    }
  });

  beforeEach(async () => {
    await cleanupDatabase();
    auth.mockResolvedValue(mockAdminSession);
  });

  afterAll(async () => {
    await closeTestDatabase();
  });

  describe('GET /api/tables', () => {
    it('should return 401 when not authenticated', async () => {
      auth.mockResolvedValue(null);
      
      const response = await testApi.get(GET, 'http://localhost:3000/api/tables', null);
      expectApiError(response, 401, 'Unauthorized');
    });

    it('should return empty array when no tables exist', async () => {
      const response = await testApi.get(GET, 'http://localhost:3000/api/tables');
      
      expectApiSuccess(response);
      expect(response.data).toEqual([]);
    });

    it('should return all active tables with pricing packages', async () => {
      // Create pricing packages
      const pricingPackageData = factories.pricingPackage({
        name: 'Standard',
        hourlyRate: '50000.00',
        perMinuteRate: '1000.00',
      });
      const [pricingPackage] = await db.insert(pricingPackages).values(pricingPackageData).returning();

      // Create tables
      const tables = await createBulk(db, billiardTables, factories.billiardTable, 3, {
        pricingPackageId: pricingPackage.id,
        isActive: true,
      });

      const response = await testApi.get(GET, 'http://localhost:3000/api/tables');
      
      expectApiSuccess(response);
      expect(response.data).toHaveLength(3);
      expect(response.data[0]).toMatchObject({
        id: expect.any(Number),
        name: expect.any(String),
        status: expect.any(String),
        pricingPackageId: pricingPackage.id,
        pricingPackage: expect.objectContaining({
          id: pricingPackage.id,
          name: 'Standard',
          hourlyRate: '50000.00',
          perMinuteRate: '1000.00',
        }),
      });
    });

    it('should not return inactive tables', async () => {
      await createBulk(db, billiardTables, factories.billiardTable, 2, {
        isActive: true,
      });
      await createBulk(db, billiardTables, factories.billiardTable, 1, {
        isActive: false,
      });

      const response = await testApi.get(GET, 'http://localhost:3000/api/tables');
      
      expectApiSuccess(response);
      expect(response.data).toHaveLength(2);
    });

    it('should allow staff to fetch tables', async () => {
      auth.mockResolvedValue(mockStaffSession);
      
      await createBulk(db, billiardTables, factories.billiardTable, 1);
      
      const response = await testApi.get(GET, 'http://localhost:3000/api/tables', mockStaffSession);
      
      expectApiSuccess(response);
      expect(response.data).toHaveLength(1);
    });
  });

  describe('POST /api/tables', () => {
    it('should return 401 when not authenticated', async () => {
      auth.mockResolvedValue(null);
      
      const response = await testApi.post(
        POST,
        'http://localhost:3000/api/tables',
        { name: 'Table 1' },
        null
      );
      
      expectApiError(response, 401, 'Unauthorized');
    });

    it('should return 400 when name is missing', async () => {
      const response = await testApi.post(
        POST,
        'http://localhost:3000/api/tables',
        { status: 'available' }
      );
      
      expectApiError(response, 400, 'Name is required');
    });

    it('should create a new table with default status', async () => {
      const response = await testApi.post(
        POST,
        'http://localhost:3000/api/tables',
        { name: 'Table 1' }
      );
      
      expectApiSuccess(response, 201);
      expect(response.data).toMatchObject({
        id: expect.any(Number),
        name: 'Table 1',
        status: 'available',
        isActive: true,
        hourlyRate: '0.00',
        perMinuteRate: '0.0000',
      });
    });

    it('should create a new table with custom status', async () => {
      const response = await testApi.post(
        POST,
        'http://localhost:3000/api/tables',
        { 
          name: 'VIP Table',
          status: 'maintenance'
        }
      );
      
      expectApiSuccess(response, 201);
      expect(response.data).toMatchObject({
        name: 'VIP Table',
        status: 'maintenance',
      });
    });

    it('should allow staff to create tables', async () => {
      auth.mockResolvedValue(mockStaffSession);
      
      const response = await testApi.post(
        POST,
        'http://localhost:3000/api/tables',
        { name: 'Staff Table' },
        mockStaffSession
      );
      
      expectApiSuccess(response, 201);
      expect(response.data.name).toBe('Staff Table');
    });
  });
});