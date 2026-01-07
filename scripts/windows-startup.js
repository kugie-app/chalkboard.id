#!/usr/bin/env node

/**
 * Windows Standalone Startup Script
 * Runs database migrations then starts the application
 */

const { execSync, spawn } = require('child_process');
const path = require('path');

console.log('🚀 Chalkboard.id - Starting up...\n');

// Check if DATABASE_URL is set
if (!process.env.DATABASE_URL) {
  console.error('❌ DATABASE_URL environment variable is not set!');
  console.log('Please set your PostgreSQL connection string in DATABASE_URL');
  console.log('Example: postgresql://username:password@localhost:5432/chalkboard');
  process.exit(1);
}

// Check if bun is available for migrations
let hasBun = true;
try {
  execSync('bun --version', { stdio: 'ignore' });
} catch (error) {
  hasBun = false;
}

if (!hasBun) {
  console.log('⚠️  Bun not found - skipping automatic database migration');
  console.log('Please run "bun run db:push" manually before first use\n');
} else {
  // Run database migration
  console.log('🔄 Setting up database...');
  try {
    execSync('bun run db:push', { 
      stdio: 'inherit',
      env: process.env 
    });
    console.log('✅ Database setup completed!\n');
  } catch (error) {
    console.error('⚠️  Database setup failed:', error.message);
    console.log('Continuing anyway...\n');
  }
}

console.log('✅ Starting Chalkboard.id server...');
console.log('Access your application at: http://localhost:3000');
console.log('Press Ctrl+C to stop\n');

// Start the main application
require('../server.js');