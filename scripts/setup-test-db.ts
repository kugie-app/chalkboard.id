#!/usr/bin/env bun
// Script to set up test database for CI

import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

async function setupTestDatabase() {
  console.log('🔧 Setting up test database...');
  
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error('DATABASE_URL environment variable is required');
  }
  
  console.log('📡 Connecting to database...');
  const connection = postgres(databaseUrl, { max: 1 });
  const db = drizzle(connection);
  
  try {
    console.log('🔄 Running migrations...');
    await migrate(db, { migrationsFolder: './drizzle' });
    console.log('✅ Database setup completed successfully');
  } catch (error: any) {
    // Check if it's a "table already exists" error, which is OK for tests
    if (error.message?.includes('already exists') || error.code === '42P07') {
      console.log('⚠️  Tables already exist, continuing...');
    } else {
      console.error('❌ Database setup failed:', error);
      throw error;
    }
  } finally {
    await connection.end();
  }
}

// Run the setup
if (import.meta.main) {
  setupTestDatabase()
    .then(() => {
      console.log('🎉 Test database ready!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Setup failed:', error);
      process.exit(1);
    });
}