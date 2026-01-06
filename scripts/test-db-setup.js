#!/usr/bin/env bun
// Test script to verify database setup works like in CI

import { execSync } from 'child_process';
import { existsSync } from 'fs';

console.log('🧪 Testing database setup for CI...\n');

// Check if we have a local PostgreSQL setup
const localDbUrl = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/chalkboard_test';

try {
  console.log('1. Setting up test environment...');
  process.env.DATABASE_URL = localDbUrl;
  process.env.NEXTAUTH_SECRET = 'test-secret-key';
  process.env.NEXTAUTH_URL = 'http://localhost:3000';
  process.env.DEPLOYMENT_MODE = 'test';

  console.log('2. Running database migrations...');
  execSync('bun run db:generate', { stdio: 'inherit' });
  execSync('bun run db:push', { stdio: 'inherit' });

  console.log('3. Running tests...');
  execSync('bun run test:ci', { stdio: 'inherit' });

  console.log('\n✅ All tests passed! Database setup works correctly.');
  
} catch (error) {
  console.error('\n❌ Test failed:', error.message);
  
  console.log('\n🔍 Troubleshooting tips:');
  console.log('- Make sure PostgreSQL is running: brew services start postgresql');
  console.log('- Create test database: createdb chalkboard_test');
  console.log('- Check connection: psql postgresql://postgres:postgres@localhost:5432/chalkboard_test');
  
  process.exit(1);
}