#!/usr/bin/env bun

/**
 * Migration Runner
 * Runs database migrations to the current application version
 */

import { runMigrations, checkMigrationStatus } from './migration-manager';
import { getDeploymentConfig } from './deployment-config';

async function main() {
  console.log('🔄 Starting database migration process...');
  console.log('');

  try {
    const config = getDeploymentConfig();
    const targetVersion = config.versioning.currentVersion;

    console.log(`📋 Migration Details:`);
    console.log(`   Current Version: ${targetVersion}`);
    console.log(`   Deployment Mode: ${config.mode}`);
    console.log(`   Database Provider: ${config.provider}`);
    console.log(`   Auto Migration: ${config.versioning.autoMigration ? 'Enabled' : 'Disabled'}`);
    console.log('');

    // Check migration status first
    const status = await checkMigrationStatus(targetVersion);
    
    if (!status.needsMigration) {
      console.log('✅ Database is up to date');
      console.log(`   Current Version: ${status.currentVersion}`);
      console.log(`   Target Version: ${status.targetVersion}`);
      process.exit(0);
    }

    console.log(`📊 Migration Status:`);
    console.log(`   Current Database Version: ${status.currentVersion}`);
    console.log(`   Target Version: ${status.targetVersion}`);
    console.log(`   Pending Migrations: ${status.pendingMigrations}`);
    console.log('');

    // Run migrations
    const result = await runMigrations(targetVersion);

    if (result.success) {
      console.log('✅ Migration completed successfully!');
      console.log(`   Final Version: ${result.version}`);
      console.log(`   Migrations Applied: ${result.migrationsApplied}`);
      
      if (result.backup) {
        console.log(`   Backup Created: ${result.backup}`);
      }
    } else {
      console.error('❌ Migration failed!');
      console.error(`   Error: ${result.error}`);
      console.error(`   Failed at Version: ${result.version}`);
      console.error(`   Migrations Applied: ${result.migrationsApplied}`);
      
      if (result.backup) {
        console.error(`   Backup Available: ${result.backup}`);
      }
      
      process.exit(1);
    }

  } catch (error) {
    console.error('❌ Migration process failed:', error);
    process.exit(1);
  }
}

// Run if called directly (Node.js only)
if (typeof process !== 'undefined' && process.argv && process.argv[1]?.includes('run-migrations')) {
  main();
}