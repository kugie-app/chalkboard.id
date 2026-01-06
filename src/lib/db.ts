import { drizzle as drizzlePostgres } from 'drizzle-orm/postgres-js';
import { drizzle as drizzleNeon } from 'drizzle-orm/neon-http';
import postgres from 'postgres';
import { neon } from '@neondatabase/serverless';
import * as schema from '@/schema';
import { getDeploymentConfig, validateDeploymentConfig } from './deployment-config';

// Validate deployment configuration
validateDeploymentConfig();

/**
 * Database connection with multi-mode deployment support
 * Supports Railway PostgreSQL, local PostgreSQL, Neon, and standard PostgreSQL
 */

const config = getDeploymentConfig();

/**
 * Create database connection string based on configuration
 */
function createConnectionString(): string {
  // Use DATABASE_URL if provided (Railway and most other providers set this)
  if (process.env.DATABASE_URL) {
    return process.env.DATABASE_URL;
  }

  // Build connection string from individual components (for local deployment)
  const host = config.database.host || 'localhost';
  const port = config.database.port || 5432;
  const database = config.database.database || 'chalkboard';
  const username = config.database.username || 'postgres';
  const password = config.database.password || 'postgres';

  return `postgresql://${username}:${password}@${host}:${port}/${database}`;
}

const connectionString = createConnectionString();

if (!connectionString) {
  throw new Error('DATABASE_URL environment variable is required or database configuration is incomplete');
}

/**
 * Create database connection based on deployment configuration and provider
 */
function createDatabaseConnection() {
  // Use serverless connection for Neon or edge runtime
  if (config.database.useServerless || config.provider === 'neon') {
    const sql = neon(connectionString);
    return drizzleNeon(sql, { schema });
  }

  // Standard PostgreSQL connection for Railway, local, and standard deployments
  const clientConfig: any = {
    prepare: false,
  };

  // Configure connection pooling for Railway and local deployments
  if (config.database.pooling) {
    clientConfig.max = 10; // Maximum 10 connections in pool
    clientConfig.idle_timeout = 20; // Close idle connections after 20 seconds
  } else {
    clientConfig.max = 1; // Single connection
  }

  // Railway-specific optimizations
  if (config.mode === 'railway') {
    clientConfig.idle_timeout = 60; // Longer idle timeout for Railway
    clientConfig.connect_timeout = 30; // Connection timeout
  }

  // Standalone mode optimizations for local PostgreSQL
  if (config.mode === 'standalone') {
    clientConfig.max = 5; // Fewer connections for local deployment
    clientConfig.idle_timeout = 300; // Keep connections longer for standalone
  }

  const client = postgres(connectionString, clientConfig);
  return drizzlePostgres(client, { schema });
}

export const db = createDatabaseConnection();

export { schema };

// Export connection info for debugging
export const connectionInfo = {
  mode: config.mode,
  provider: config.provider,
  useServerless: config.database.useServerless,
  pooling: config.database.pooling,
}; 