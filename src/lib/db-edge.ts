import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from '@/schema';

/**
 * Edge-optimized database connection using Neon's serverless driver
 * This is used when DEPLOYMENT_MODE is set to 'edge'
 */

const connectionString = process.env.DATABASE_URL!;

if (!connectionString) {
  throw new Error('DATABASE_URL environment variable is required');
}

// Create Neon HTTP client for edge runtime
const sql = neon(connectionString);
export const db = drizzle(sql, { schema });

export { schema };