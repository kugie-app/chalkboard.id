import * as schema from '@/schema';
import { getDeploymentConfig } from './deployment-config';

/**
 * Factory function to create the appropriate database connection
 * based on the deployment configuration
 */
export async function createDatabaseConnection() {
  const config = getDeploymentConfig();
  const connectionString = process.env.DATABASE_URL!;
  
  if (!connectionString) {
    throw new Error('DATABASE_URL environment variable is required');
  }
  
  if (config.database.useServerless) {
    // Edge runtime or serverless mode - use Neon HTTP driver
    const { drizzle } = await import('drizzle-orm/neon-http');
    const { neon } = await import('@neondatabase/serverless');
    
    const sql = neon(connectionString);
    return drizzle(sql, { schema });
  } else {
    // Node.js runtime - use standard postgres driver
    const { drizzle } = await import('drizzle-orm/postgres-js');
    const postgresModule = await import('postgres');
    const postgres = postgresModule.default;
    
    const client = postgres(connectionString, { 
      prepare: false,
      // Enable connection pooling for Node.js runtime if configured
      max: config.database.pooling ? 10 : 1,
    });
    
    return drizzle(client, { schema });
  }
}