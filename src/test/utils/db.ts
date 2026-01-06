import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from '@/schema';
import { migrate } from 'drizzle-orm/postgres-js/migrator';

let testDb: ReturnType<typeof drizzle> | null = null;
let testConnection: ReturnType<typeof postgres> | null = null;

export async function getTestDatabase() {
  if (!testDb) {
    const connectionString = process.env.DATABASE_URL || 'postgresql://test:test@localhost:5432/chalkboard_test';
    
    try {
      testConnection = postgres(connectionString, { max: 1 });
      testDb = drizzle(testConnection, { schema });
      
      // Run migrations on test database
      await migrate(testDb, { migrationsFolder: './drizzle' });
    } catch (error) {
      console.warn('⚠️ Database connection failed, tests will be skipped:', error.message);
      // Return null to indicate database is not available
      return null;
    }
  }
  
  return testDb;
}

export async function cleanupDatabase() {
  if (testDb) {
    const db = await getTestDatabase();
    
    // Clean all tables in reverse dependency order
    await db.delete(schema.fnbOrderItems).execute();
    await db.delete(schema.fnbOrders).execute();
    await db.delete(schema.payments).execute();
    await db.delete(schema.tableSessions).execute();
    await db.delete(schema.fnbItems).execute();
    await db.delete(schema.fnbCategories).execute();
    await db.delete(schema.tables).execute();
    await db.delete(schema.pricingPackages).execute();
    await db.delete(schema.sessions).execute();
    await db.delete(schema.users).execute();
    await db.delete(schema.staff).execute();
  }
}

export async function closeTestDatabase() {
  if (testConnection) {
    await testConnection.end();
    testConnection = null;
    testDb = null;
  }
}

// Transaction wrapper for test isolation
export async function withTransaction<T>(
  fn: (tx: any) => Promise<T>
): Promise<T> {
  const db = await getTestDatabase();
  return db.transaction(async (tx) => {
    try {
      const result = await fn(tx);
      throw new Error('ROLLBACK'); // Force rollback
    } catch (error) {
      if (error.message === 'ROLLBACK') {
        throw error;
      }
      throw error;
    }
  }).catch((error) => {
    if (error.message === 'ROLLBACK') {
      return null as T;
    }
    throw error;
  });
}