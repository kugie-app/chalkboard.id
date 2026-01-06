#!/usr/bin/env bun

/**
 * Migration Status Checker
 * Displays current database migration status and history
 */

import { 
  getCurrentDatabaseVersion, 
  getAppliedMigrations, 
  checkMigrationStatus, 
  getMigrationFiles 
} from './migration-manager';
import { getDeploymentConfig } from './deployment-config';

async function main() {
  console.log('📊 Database Migration Status');
  console.log(''.padEnd(40, '='));
  console.log('');

  try {
    const config = getDeploymentConfig();
    const targetVersion = config.versioning.currentVersion;

    // Get current status
    const currentVersion = await getCurrentDatabaseVersion();
    const status = await checkMigrationStatus(targetVersion);
    const appliedMigrations = await getAppliedMigrations();
    const migrationFiles = getMigrationFiles(targetVersion);

    // Display configuration
    console.log(`🔧 Configuration:`);
    console.log(`   Deployment Mode: ${config.mode}`);
    console.log(`   Database Provider: ${config.provider}`);
    console.log(`   Auto Migration: ${config.versioning.autoMigration ? 'Enabled' : 'Disabled'}`);
    console.log('');

    // Display version information
    console.log(`📋 Version Information:`);
    console.log(`   Current Database Version: ${currentVersion}`);
    console.log(`   Application Version: ${targetVersion}`);
    console.log(`   Migration Status: ${status.needsMigration ? '⚠️  Migrations Pending' : '✅ Up to Date'}`);
    console.log('');

    // Display migration statistics
    console.log(`📈 Migration Statistics:`);
    console.log(`   Total Migration Files: ${migrationFiles.length}`);
    console.log(`   Applied Migrations: ${appliedMigrations.length}`);
    console.log(`   Pending Migrations: ${status.pendingMigrations}`);
    console.log('');

    // Display applied migrations
    if (appliedMigrations.length > 0) {
      console.log(`✅ Applied Migrations (${appliedMigrations.length}):`);
      console.log(''.padEnd(60, '-'));
      console.log('Version'.padEnd(15) + 'Date'.padEnd(25) + 'Description');
      console.log(''.padEnd(60, '-'));
      
      appliedMigrations.forEach(migration => {
        const version = migration.version.padEnd(14);
        const date = migration.timestamp.toISOString().split('T')[0].padEnd(24);
        const description = migration.description.substring(0, 30);
        console.log(`${version} ${date} ${description}`);
      });
      console.log('');
    }

    // Display pending migrations
    if (status.pendingMigrations > 0) {
      const appliedVersions = new Set(appliedMigrations.map(m => m.version));
      const pendingMigrations = migrationFiles.filter(m => !appliedVersions.has(m.version));
      
      console.log(`⚠️  Pending Migrations (${pendingMigrations.length}):`);
      console.log(''.padEnd(60, '-'));
      console.log('Version'.padEnd(15) + 'Description');
      console.log(''.padEnd(60, '-'));
      
      pendingMigrations.forEach(migration => {
        const version = migration.version.padEnd(14);
        const description = migration.description.substring(0, 40);
        console.log(`${version} ${description}`);
      });
      console.log('');
      
      console.log('💡 To apply pending migrations, run:');
      console.log('   bun run migration:run');
      console.log('');
    }

    // Display warnings if any
    if (config.mode === 'standalone' && !config.versioning.autoMigration) {
      console.log('⚠️  Warning: Auto-migration is disabled in standalone mode');
      console.log('   Manual migration required before updating the application');
      console.log('');
    }

    if (status.needsMigration && config.mode === 'railway') {
      console.log('⚠️  Warning: Database migrations pending');
      console.log('   Ensure migrations run successfully before deploying to Railway');
      console.log('');
    }

  } catch (error) {
    console.error('❌ Failed to get migration status:', error);
    console.error('');
    console.error('💡 Possible causes:');
    console.error('   - Database connection failed');
    console.error('   - Migrations table not accessible');
    console.error('   - Invalid configuration');
    console.error('');
    process.exit(1);
  }
}

// Run if called directly (Node.js only)
if (typeof process !== 'undefined' && process.argv && process.argv[1]?.includes('migration-status')) {
  main();
}