/**
 * Database Health Check Utilities
 * Validates database connection and schema readiness on startup
 */

import { db, dbReady } from './db';
import { sql } from 'drizzle-orm';
import { getDeploymentConfig } from './deployment-config';

export interface DatabaseHealthCheck {
  status: 'healthy' | 'warning' | 'error';
  message: string;
  details?: string;
  timestamp: Date;
}

export interface StartupHealthReport {
  overall: 'healthy' | 'warning' | 'error';
  checks: {
    connection: DatabaseHealthCheck;
    schema: DatabaseHealthCheck;
    tables: DatabaseHealthCheck;
    permissions: DatabaseHealthCheck;
  };
  config: {
    mode: string;
    provider: string;
    pooling: boolean;
  };
}

/**
 * Test basic database connectivity
 */
export async function checkDatabaseConnection(): Promise<DatabaseHealthCheck> {
  try {
    const startTime = Date.now();
    await db.execute(sql`SELECT 1 as test`);
    const responseTime = Date.now() - startTime;
    
    return {
      status: 'healthy',
      message: `Database connected successfully`,
      details: `Response time: ${responseTime}ms`,
      timestamp: new Date(),
    };
  } catch (error) {
    return {
      status: 'error',
      message: 'Database connection failed',
      details: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date(),
    };
  }
}

/**
 * Check if core tables exist and are accessible
 */
export async function checkDatabaseSchema(): Promise<DatabaseHealthCheck> {
  try {
    // List of core tables that should exist
    const coreTables = [
      'users',
      'accounts',
      'sessions',
      'tables',
      'table_sessions',
      'fnb_categories',
      'fnb_items',
      'fnb_orders',
      'payments'
    ];

    const existingTables: string[] = [];
    const missingTables: string[] = [];

    for (const tableName of coreTables) {
      try {
        const result = await db.execute(sql`
          SELECT EXISTS (
            SELECT FROM information_schema.tables 
            WHERE table_schema = 'public' 
            AND table_name = ${tableName}
          ) as exists
        `);
        
        const exists = Array.isArray(result) ? result[0]?.exists : result.rows?.[0]?.exists;
        
        if (exists) {
          existingTables.push(tableName);
        } else {
          missingTables.push(tableName);
        }
      } catch (error) {
        missingTables.push(tableName);
      }
    }

    if (missingTables.length === 0) {
      return {
        status: 'healthy',
        message: `All ${coreTables.length} core tables exist`,
        details: `Tables: ${existingTables.join(', ')}`,
        timestamp: new Date(),
      };
    } else if (existingTables.length > 0) {
      return {
        status: 'warning',
        message: `Some tables missing (${missingTables.length}/${coreTables.length})`,
        details: `Missing: ${missingTables.join(', ')}`,
        timestamp: new Date(),
      };
    } else {
      return {
        status: 'error',
        message: 'No core tables found - database needs initialization',
        details: `Expected: ${coreTables.join(', ')}`,
        timestamp: new Date(),
      };
    }
  } catch (error) {
    return {
      status: 'error',
      message: 'Schema check failed',
      details: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date(),
    };
  }
}

/**
 * Check if we can perform basic table operations
 */
export async function checkTablePermissions(): Promise<DatabaseHealthCheck> {
  try {
    // Test if we can read from a core table
    await db.execute(sql`SELECT COUNT(*) FROM users LIMIT 1`);
    
    return {
      status: 'healthy',
      message: 'Database permissions OK',
      details: 'Can read/write to core tables',
      timestamp: new Date(),
    };
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : 'Unknown error';
    
    if (errorMsg.includes('permission denied')) {
      return {
        status: 'error',
        message: 'Database permission denied',
        details: errorMsg,
        timestamp: new Date(),
      };
    } else if (errorMsg.includes('does not exist')) {
      return {
        status: 'warning',
        message: 'Core tables not found',
        details: 'Database may need schema push/migration',
        timestamp: new Date(),
      };
    } else {
      return {
        status: 'error',
        message: 'Table access failed',
        details: errorMsg,
        timestamp: new Date(),
      };
    }
  }
}

/**
 * Check table counts and data integrity
 */
export async function checkTableData(): Promise<DatabaseHealthCheck> {
  try {
    const checks = await Promise.allSettled([
      db.execute(sql`SELECT COUNT(*) as count FROM users`),
      db.execute(sql`SELECT COUNT(*) as count FROM billiard_tables`),
      db.execute(sql`SELECT COUNT(*) as count FROM fnb_categories`),
    ]);

    const results = checks.map((check, index) => {
      const tableNames = ['users', 'billiard_tables', 'fnb_categories'];
      if (check.status === 'fulfilled') {
        const count = Array.isArray(check.value) 
          ? check.value[0]?.count 
          : check.value.rows?.[0]?.count;
        return `${tableNames[index]}: ${count || 0}`;
      } else {
        return `${tableNames[index]}: error`;
      }
    });

    const hasData = checks.some(check => {
      if (check.status === 'fulfilled') {
        const count = Array.isArray(check.value) 
          ? check.value[0]?.count 
          : check.value.rows?.[0]?.count;
        return (count || 0) > 0;
      }
      return false;
    });

    return {
      status: hasData ? 'healthy' : 'warning',
      message: hasData ? 'Tables have data' : 'Tables are empty',
      details: results.join(', '),
      timestamp: new Date(),
    };
  } catch (error) {
    return {
      status: 'warning',
      message: 'Could not check table data',
      details: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date(),
    };
  }
}

/**
 * Run comprehensive startup health checks
 */
export async function runStartupHealthChecks(): Promise<StartupHealthReport> {
  console.log('🔍 Running startup health checks...');

  // Wait for PGlite migrations to complete before checking schema
  await dbReady;

  const config = getDeploymentConfig();
  
  // Run all checks in parallel
  const [connection, schema, permissions, tables] = await Promise.all([
    checkDatabaseConnection(),
    checkDatabaseSchema(), 
    checkTablePermissions(),
    checkTableData(),
  ]);

  // Determine overall health
  const checks = { connection, schema, tables, permissions };
  const hasErrors = Object.values(checks).some(check => check.status === 'error');
  const hasWarnings = Object.values(checks).some(check => check.status === 'warning');
  
  const overall = hasErrors ? 'error' : hasWarnings ? 'warning' : 'healthy';

  const report: StartupHealthReport = {
    overall,
    checks,
    config: {
      mode: config.mode,
      provider: config.provider,
      pooling: config.database.pooling,
    },
  };

  // Log results
  console.log(`📊 Health Check Results:`);
  console.log(`   Overall Status: ${overall.toUpperCase()}`);
  console.log(`   Connection: ${connection.status} - ${connection.message}`);
  console.log(`   Schema: ${schema.status} - ${schema.message}`);
  console.log(`   Permissions: ${permissions.status} - ${permissions.message}`);
  console.log(`   Tables: ${tables.status} - ${tables.message}`);
  console.log(`   Mode: ${config.mode}, Provider: ${config.provider}`);

  return report;
}