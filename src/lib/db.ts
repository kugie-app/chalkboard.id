import { drizzle as drizzlePostgres } from 'drizzle-orm/postgres-js';
import { drizzle as drizzleNeon } from 'drizzle-orm/neon-http';
import { drizzle as drizzlePglite } from 'drizzle-orm/pglite';
import postgres from 'postgres';
import { neon } from '@neondatabase/serverless';
import { PGlite } from '@electric-sql/pglite';
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
 * Get database directory path for PGlite
 * In browser (dev mode): use indexedDB
 * In production/build: use file system path
 */
function getPgliteDataDir(): string {
  // For now, use indexedDB for development (will update for Tauri later)
  // When in Tauri, we'll use the app data directory
  if (typeof window !== 'undefined' && '__TAURI__' in window) {
    // TODO: Use Tauri path API to get app data directory
    // For now, use a default path
    return './chalkboard-data';
  }
  // Use indexedDB for browser/dev mode
  return 'idb://chalkboard-db';
}

/**
 * Create database connection string based on configuration
 */
function createConnectionString(): string | null {
  // PGlite doesn't use connection strings
  if (config.provider === 'pglite') {
    return null;
  }

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

if (!connectionString && config.provider !== 'pglite') {
  throw new Error('DATABASE_URL environment variable is required or database configuration is incomplete');
}

/**
 * Create database connection based on deployment configuration and provider
 */
function createDatabaseConnection() {
  // Use PGlite for desktop mode
  if (config.provider === 'pglite') {
    const dataDir = getPgliteDataDir();
    const pglite = new PGlite(dataDir);
    return drizzlePglite(pglite, { schema });
  }

  // Use serverless connection for Neon or edge runtime
  if (config.database.useServerless || config.provider === 'neon') {
    const sql = neon(connectionString!);
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

  const client = postgres(connectionString!, clientConfig);
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