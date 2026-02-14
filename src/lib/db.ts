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
  if (process.env.DEPLOYMENT_MODE === 'desktop') {
    const os = require('os');
    const path = require('path');
    const appName = 'com.kugie.chalkboard';
    const platform = process.platform;
    if (platform === 'win32') {
      return path.join(process.env.APPDATA || path.join(os.homedir(), 'AppData', 'Roaming'), appName, 'data');
    } else if (platform === 'darwin') {
      return path.join(os.homedir(), 'Library', 'Application Support', appName, 'data');
    } else {
      return path.join(process.env.XDG_DATA_HOME || path.join(os.homedir(), '.local', 'share'), appName, 'data');
    }
  }
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
 * Run Drizzle migrations on PGlite to ensure schema is up to date.
 * Uses the generated migration files in the drizzle/ directory.
 */
let _dbReady: Promise<void> | null = null;

async function runPgliteMigrations(db: ReturnType<typeof drizzlePglite>) {
  try {
    const { migrate } = require('drizzle-orm/pglite/migrator');
    const path = require('path');
    const migrationsFolder = path.join(process.cwd(), 'drizzle');
    await migrate(db, { migrationsFolder });
    console.log('✅ PGlite migrations applied successfully');
  } catch (err) {
    console.error('❌ PGlite migration failed:', err);
  }
}

/**
 * Create database connection based on deployment configuration and provider
 */
function createDatabaseConnection() {
  // Use PGlite for desktop mode
  if (config.provider === 'pglite') {
    const dataDir = getPgliteDataDir();
    let db: ReturnType<typeof drizzlePglite>;
    if (!dataDir.startsWith('idb://')) {
      const fs = require('fs');
      fs.mkdirSync(dataDir, { recursive: true });
      const { NodeFS } = require('@electric-sql/pglite/nodefs');
      const pglite = new PGlite({ fs: new NodeFS(dataDir) });
      db = drizzlePglite(pglite, { schema });
    } else {
      const pglite = new PGlite(dataDir);
      db = drizzlePglite(pglite, { schema });
    }
    // Auto-migrate on startup
    _dbReady = runPgliteMigrations(db);
    return db;
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

// Promise that resolves when PGlite migrations are complete (no-op for other providers)
export const dbReady: Promise<void> = _dbReady ?? Promise.resolve();

// Export connection info for debugging
export const connectionInfo = {
  mode: config.mode,
  provider: config.provider,
  useServerless: config.database.useServerless,
  pooling: config.database.pooling,
}; 