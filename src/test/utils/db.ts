import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from '@/schema';
import { migrate } from 'drizzle-orm/postgres-js/migrator';

let testDb: ReturnType<typeof drizzle> | null = null;
let testConnection: ReturnType<typeof postgres> | null = null;

/**
 * Lazily initializes a test PostgreSQL database, runs migrations on first call, and returns the initialized Drizzle instance.
 *
 * @returns The Drizzle database instance bound to the test connection, or `null` if the test database could not be initialized.
 */
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

/**
 * Clears all records from the test database tables in a dependency-safe order.
 *
 * Deletes every row from all application tables used in tests (executing deletes in reverse
 * dependency order to avoid foreign-key constraint errors). If the test database has not
 * been initialized, no action is taken.
 */
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

/**
 * Closes the test PostgreSQL connection and clears cached database state.
 *
 * Ends the underlying raw connection if one exists and resets the cached
 * drizzle database instance and connection reference to `null`. Has no effect
 * if no test connection is active.
 */
export async function closeTestDatabase() {
  if (testConnection) {
    await testConnection.end();
    testConnection = null;
    testDb = null;
  }
}

/**
 * Executes a callback inside a database transaction and forces a rollback so changes are not persisted.
 *
 * @param fn - Callback invoked with a transaction-scoped database handle.
 * @returns The value returned by `fn`, or `null` if the transaction was rolled back.
 * @throws Any error thrown by `fn` or the underlying transaction, other than the forced rollback which is translated to `null`.
 */
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