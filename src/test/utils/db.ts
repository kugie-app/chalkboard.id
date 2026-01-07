import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from '@/schema';
import { sql } from 'drizzle-orm';

let testDb: ReturnType<typeof drizzle> | null = null;
let testConnection: ReturnType<typeof postgres> | null = null;

export async function getTestDatabase() {
  if (!testDb) {
    const connectionString = process.env.DATABASE_URL || 
      (process.env.CI ? 'postgresql://postgres:postgres@localhost:5432/chalkboard_test' : 
       'postgresql://postgres:postgres@localhost:5433/chalkboard_test');
    
    try {
      testConnection = postgres(connectionString, { max: 1 });
      testDb = drizzle(testConnection, { schema });
      
      // Test the connection with a simple query
      await testDb.execute(sql`SELECT 1`);
    } catch (error) {
      console.warn('⚠️ Database connection failed, tests will be skipped:', error.message);
      // Return null to indicate database is not available
      return null;
    }
  }
  
  return testDb;
}

export async function cleanupDatabase() {
  const db = await getTestDatabase();
  if (!db) {
    console.warn('⚠️ Database not available, skipping cleanup');
    return;
  }
  
  try {
    // Use TRUNCATE for faster cleanup and to reset sequences
    await db.execute(sql`
      TRUNCATE TABLE 
        fnb_order_items,
        table_sessions,
        fnb_orders,
        fnb_items,
        fnb_categories,
        payments,
        tables,
        pricing_packages,
        sessions,
        users,
        staff
      RESTART IDENTITY CASCADE
    `);
  } catch (error) {
    console.warn('⚠️ Database cleanup failed, trying individual deletes:', error.message);
    // Fallback to individual deletes if truncate fails
    try {
      await db.delete(schema.fnbOrderItems).execute();
      await db.delete(schema.tableSessions).execute();
      await db.delete(schema.fnbOrders).execute();
      await db.delete(schema.fnbItems).execute();
      await db.delete(schema.fnbCategories).execute();
      await db.delete(schema.payments).execute();
      await db.delete(schema.tables).execute();
      await db.delete(schema.pricingPackages).execute();
      await db.delete(schema.sessions).execute();
      await db.delete(schema.users).execute();
      await db.delete(schema.staff).execute();
    } catch (fallbackError) {
      console.warn('⚠️ Fallback cleanup also failed:', fallbackError.message);
    }
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

// Helper to skip tests when database is unavailable
export function skipIfNoDb(db: any) {
  if (!db) {
    console.log('⏭️  Skipping test - database unavailable');
    return true;
  }
  return false;
}

// Conditional describe block
export function describeWithDb(name: string, fn: () => void, db: any) {
  if (db) {
    describe(name, fn);
  } else {
    describe.skip(name, fn);
  }
}