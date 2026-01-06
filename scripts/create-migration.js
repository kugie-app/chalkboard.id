#!/usr/bin/env node

/**
 * Create Migration Script
 * Generates new database migration files with proper versioning
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Get version and description from command line arguments
const args = process.argv.slice(2);
const version = args[0] || process.env.npm_package_version || '4.0.0';
const description = args.slice(1).join('-') || 'migration';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

/**
 * Prompt for user input
 */
function prompt(question) {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
}

/**
 * Create migrations directory if it doesn't exist
 */
function ensureMigrationsDirectory() {
  const migrationsDir = path.join(process.cwd(), 'migrations');
  if (!fs.existsSync(migrationsDir)) {
    fs.mkdirSync(migrationsDir, { recursive: true });
    console.log('Created migrations directory:', migrationsDir);
  }
  return migrationsDir;
}

/**
 * Generate migration file name
 */
function generateFileName(version, description) {
  const sanitizedDescription = description
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  
  return `${version}-${sanitizedDescription}.sql`;
}

/**
 * Create migration file template
 */
function createMigrationTemplate(version, description) {
  return `-- Migration: ${description}
-- Version: ${version}
-- Created: ${new Date().toISOString()}

-- This migration will be automatically applied when upgrading to version ${version}
-- Make sure all SQL commands are idempotent (can be run multiple times safely)

-- Example: Creating a new table
-- CREATE TABLE IF NOT EXISTS new_table (
--   id SERIAL PRIMARY KEY,
--   name VARCHAR(255) NOT NULL,
--   created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
-- );

-- Example: Adding a new column
-- ALTER TABLE existing_table 
-- ADD COLUMN IF NOT EXISTS new_column VARCHAR(100) DEFAULT '';

-- Example: Creating an index
-- CREATE INDEX IF NOT EXISTS idx_table_column ON table_name (column_name);

-- Example: Inserting default data
-- INSERT INTO settings (key, value) 
-- VALUES ('new_setting', 'default_value')
-- ON CONFLICT (key) DO NOTHING;

-- =========================================
-- Add your migration SQL below this line:
-- =========================================

-- TODO: Add your actual migration SQL here

-- =========================================
-- Migration SQL ends here
-- =========================================

-- Note: This file will be executed within a transaction.
-- If any statement fails, the entire migration will be rolled back.
`;
}

/**
 * Main migration creation process
 */
async function main() {
  console.log('🔧 Creating new database migration...');
  console.log('');

  try {
    // Get migration details
    const migrationVersion = version || await prompt('Enter version (e.g., 4.1.0): ');
    const migrationDescription = description || await prompt('Enter description (e.g., add-user-roles): ');

    if (!migrationVersion) {
      throw new Error('Version is required');
    }

    if (!migrationDescription) {
      throw new Error('Description is required');
    }

    // Ensure migrations directory exists
    const migrationsDir = ensureMigrationsDirectory();

    // Generate file name and path
    const fileName = generateFileName(migrationVersion, migrationDescription);
    const filePath = path.join(migrationsDir, fileName);

    // Check if file already exists
    if (fs.existsSync(filePath)) {
      const overwrite = await prompt(`File ${fileName} already exists. Overwrite? (y/N): `);
      if (overwrite.toLowerCase() !== 'y' && overwrite.toLowerCase() !== 'yes') {
        console.log('❌ Migration creation cancelled');
        process.exit(0);
      }
    }

    // Create migration file
    const template = createMigrationTemplate(migrationVersion, migrationDescription);
    fs.writeFileSync(filePath, template);

    console.log('');
    console.log('✅ Migration created successfully!');
    console.log('📁 File:', filePath);
    console.log('📝 Version:', migrationVersion);
    console.log('📝 Description:', migrationDescription);
    console.log('');
    console.log('💡 Next steps:');
    console.log('   1. Edit the migration file and add your SQL');
    console.log('   2. Test the migration with: bun run migration:run');
    console.log('   3. Check migration status with: bun run migration:status');
    console.log('');

  } catch (error) {
    console.error('❌ Failed to create migration:', error.message);
    process.exit(1);
  } finally {
    rl.close();
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { main };