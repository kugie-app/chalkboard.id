/**
 * Database Migration Manager for Version Upgrades
 * Handles automatic database migrations during application updates
 */

import { db } from './db';
import { getDeploymentConfig } from './deployment-config';
import { sql } from 'drizzle-orm';
import path from 'path';
import fs from 'fs';

export interface MigrationInfo {
  version: string;
  description: string;
  timestamp: Date;
  checksum: string;
  applied: boolean;
}

export interface MigrationResult {
  success: boolean;
  version: string;
  migrationsApplied: number;
  error?: string;
  backup?: string;
}

/**
 * Create migrations table if it doesn't exist
 */
export async function ensureMigrationsTable(): Promise<void> {
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS __migrations (
      id SERIAL PRIMARY KEY,
      version VARCHAR(20) NOT NULL,
      description TEXT NOT NULL,
      checksum VARCHAR(64) NOT NULL,
      applied_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      execution_time_ms INTEGER DEFAULT 0,
      UNIQUE(version)
    )
  `);
}

/**
 * Get current database version
 */
export async function getCurrentDatabaseVersion(): Promise<string> {
  try {
    await ensureMigrationsTable();
    
    const result = await db.execute(sql`
      SELECT version 
      FROM __migrations 
      ORDER BY applied_at DESC 
      LIMIT 1
    `);
    
    const rows = Array.isArray(result) ? result : result.rows || result;
    return rows.length > 0 ? (rows[0] as any).version as string : '0.0.0';
  } catch (error) {
    console.warn('Could not determine current database version:', error);
    return '0.0.0';
  }
}

/**
 * Get all applied migrations
 */
export async function getAppliedMigrations(): Promise<MigrationInfo[]> {
  await ensureMigrationsTable();
  
  const result = await db.execute(sql`
    SELECT version, description, applied_at as timestamp, checksum
    FROM __migrations
    ORDER BY applied_at ASC
  `);
  
  const rows = Array.isArray(result) ? result : result.rows || result;
  return rows.map((row: any) => ({
    version: row.version as string,
    description: row.description as string,
    timestamp: row.timestamp as Date,
    checksum: row.checksum as string,
    applied: true,
  }));
}

/**
 * Create database backup before migrations (for standalone mode)
 */
export async function createDatabaseBackup(version: string): Promise<string | null> {
  const config = getDeploymentConfig();
  
  if (config.mode !== 'standalone') {
    console.log('Database backup skipped (not in standalone mode)');
    return null;
  }

  try {
    const backupDir = './backups';
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupFile = path.join(backupDir, `chalkboard-backup-v${version}-${timestamp}.sql`);
    
    // Ensure backup directory exists
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }
    
    // Extract database connection details
    const dbUrl = new URL(process.env.DATABASE_URL!);
    const { hostname, port, username, password, pathname } = dbUrl;
    const database = pathname.slice(1); // Remove leading slash
    
    // Create pg_dump command
    const { spawn } = require('child_process');
    const pgDump = spawn('pg_dump', [
      '--host', hostname,
      '--port', port || '5432',
      '--username', username,
      '--dbname', database,
      '--no-password',
      '--verbose',
      '--file', backupFile,
    ], {
      env: {
        ...process.env,
        PGPASSWORD: password,
      }
    });
    
    return new Promise((resolve, reject) => {
      pgDump.on('close', (code: number) => {
        if (code === 0) {
          console.log(`Database backup created: ${backupFile}`);
          resolve(backupFile);
        } else {
          console.error(`Database backup failed with code ${code}`);
          resolve(null);
        }
      });
      
      pgDump.on('error', (error: Error) => {
        console.error('Database backup error:', error);
        resolve(null);
      });
    });
  } catch (error) {
    console.error('Failed to create database backup:', error);
    return null;
  }
}

/**
 * Apply a single migration
 */
export async function applyMigration(
  version: string,
  description: string,
  migrationSql: string
): Promise<{ success: boolean; executionTime: number; error?: string }> {
  const startTime = Date.now();
  
  try {
    // Begin transaction
    await db.execute(sql`BEGIN`);
    
    try {
      // Apply the migration
      await db.execute(sql.raw(migrationSql));
      
      // Calculate checksum
      const crypto = require('crypto');
      const checksum = crypto.createHash('sha256').update(migrationSql).digest('hex');
      
      // Record the migration
      await db.execute(sql`
        INSERT INTO __migrations (version, description, checksum, execution_time_ms)
        VALUES (${version}, ${description}, ${checksum}, ${Date.now() - startTime})
      `);
      
      // Commit transaction
      await db.execute(sql`COMMIT`);
      
      const executionTime = Date.now() - startTime;
      console.log(`Migration ${version} applied successfully in ${executionTime}ms`);
      
      return { success: true, executionTime };
    } catch (migrationError) {
      // Rollback transaction
      await db.execute(sql`ROLLBACK`);
      throw migrationError;
    }
  } catch (error) {
    const executionTime = Date.now() - startTime;
    console.error(`Migration ${version} failed:`, error);
    
    return {
      success: false,
      executionTime,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Get migration files from migrations directory
 */
export function getMigrationFiles(targetVersion: string): Array<{
  version: string;
  description: string;
  filePath: string;
}> {
  const migrationsDir = path.join(process.cwd(), 'migrations');
  
  if (!fs.existsSync(migrationsDir)) {
    console.warn('Migrations directory not found:', migrationsDir);
    return [];
  }
  
  const files = fs.readdirSync(migrationsDir)
    .filter(file => file.endsWith('.sql'))
    .map(file => {
      const match = file.match(/^(\d+\.\d+\.\d+)[-_](.+)\.sql$/);
      if (!match) return null;
      
      const [, version, description] = match;
      return {
        version,
        description: description.replace(/[-_]/g, ' '),
        filePath: path.join(migrationsDir, file),
      };
    })
    .filter((migration): migration is NonNullable<typeof migration> => migration !== null)
    .sort((a, b) => {
      // Simple version comparison (assumes semantic versioning)
      const aVersion = a.version.split('.').map(Number);
      const bVersion = b.version.split('.').map(Number);
      
      for (let i = 0; i < Math.max(aVersion.length, bVersion.length); i++) {
        const aPart = aVersion[i] || 0;
        const bPart = bVersion[i] || 0;
        if (aPart !== bPart) return aPart - bPart;
      }
      return 0;
    });
  
  return files.filter(migration => {
    const targetVersionParts = targetVersion.split('.').map(Number);
    const migrationVersionParts = migration.version.split('.').map(Number);
    
    for (let i = 0; i < Math.max(targetVersionParts.length, migrationVersionParts.length); i++) {
      const targetPart = targetVersionParts[i] || 0;
      const migrationPart = migrationVersionParts[i] || 0;
      if (migrationPart > targetPart) return false;
      if (migrationPart < targetPart) return true;
    }
    return true;
  });
}

/**
 * Run database migrations to target version
 */
export async function runMigrations(targetVersion: string): Promise<MigrationResult> {
  const config = getDeploymentConfig();
  
  if (!config.versioning.autoMigration) {
    return {
      success: false,
      version: targetVersion,
      migrationsApplied: 0,
      error: 'Auto migration is disabled',
    };
  }
  
  try {
    console.log(`Starting migration to version ${targetVersion}`);
    
    // Get current version and applied migrations
    const currentVersion = await getCurrentDatabaseVersion();
    const appliedMigrations = await getAppliedMigrations();
    const appliedVersions = new Set(appliedMigrations.map(m => m.version));
    
    console.log(`Current database version: ${currentVersion}`);
    
    // Get migration files
    const migrationFiles = getMigrationFiles(targetVersion);
    const pendingMigrations = migrationFiles.filter(m => !appliedVersions.has(m.version));
    
    if (pendingMigrations.length === 0) {
      console.log('Database is up to date');
      return {
        success: true,
        version: currentVersion,
        migrationsApplied: 0,
      };
    }
    
    console.log(`Found ${pendingMigrations.length} pending migrations`);
    
    // Create backup if in standalone mode
    let backupPath: string | null = null;
    if (config.mode === 'standalone' && process.env.MIGRATION_BACKUP !== 'false') {
      backupPath = await createDatabaseBackup(currentVersion);
    }
    
    // Apply migrations
    let migrationsApplied = 0;
    for (const migration of pendingMigrations) {
      try {
        console.log(`Applying migration ${migration.version}: ${migration.description}`);
        
        const migrationSql = fs.readFileSync(migration.filePath, 'utf-8');
        const result = await applyMigration(migration.version, migration.description, migrationSql);
        
        if (!result.success) {
          throw new Error(result.error || 'Migration failed');
        }
        
        migrationsApplied++;
      } catch (error) {
        console.error(`Failed to apply migration ${migration.version}:`, error);
        
        return {
          success: false,
          version: migration.version,
          migrationsApplied,
          error: error instanceof Error ? error.message : 'Unknown error',
          backup: backupPath || undefined,
        };
      }
    }
    
    console.log(`Successfully applied ${migrationsApplied} migrations to version ${targetVersion}`);
    
    return {
      success: true,
      version: targetVersion,
      migrationsApplied,
      backup: backupPath || undefined,
    };
  } catch (error) {
    console.error('Migration process failed:', error);
    
    return {
      success: false,
      version: targetVersion,
      migrationsApplied: 0,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Check if database needs migration
 */
export async function checkMigrationStatus(targetVersion: string): Promise<{
  needsMigration: boolean;
  currentVersion: string;
  targetVersion: string;
  pendingMigrations: number;
}> {
  const currentVersion = await getCurrentDatabaseVersion();
  const migrationFiles = getMigrationFiles(targetVersion);
  const appliedMigrations = await getAppliedMigrations();
  const appliedVersions = new Set(appliedMigrations.map(m => m.version));
  const pendingMigrations = migrationFiles.filter(m => !appliedVersions.has(m.version)).length;
  
  return {
    needsMigration: pendingMigrations > 0,
    currentVersion,
    targetVersion,
    pendingMigrations,
  };
}