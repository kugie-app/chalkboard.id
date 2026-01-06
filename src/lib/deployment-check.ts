#!/usr/bin/env bun
import { getDeploymentConfig, validateDeploymentConfig } from './deployment-config';

console.log('🔍 Checking deployment configuration...\n');

try {
  // Validate configuration
  validateDeploymentConfig();
  
  // Get current configuration
  const config = getDeploymentConfig();
  
  console.log('✅ Configuration is valid!\n');
  console.log('Current settings:');
  console.log('================');
  console.log(`Deployment Mode: ${config.mode}`);
  console.log(`Runtime: ${config.runtime}`);
  console.log(`Database Mode: ${config.database.useServerless ? 'Serverless (Edge)' : 'Standard (Node.js)'}`);
  console.log(`Connection Pooling: ${config.database.pooling ? 'Enabled' : 'Disabled'}`);
  console.log(`Streaming SSR: ${config.features.streamingSSR ? 'Enabled' : 'Disabled'}`);
  console.log(`Dynamic Imports: ${config.features.dynamicImports ? 'Enabled' : 'Disabled'}`);
  
  console.log('\nEnvironment Variables:');
  console.log('=====================');
  console.log(`DATABASE_URL: ${process.env.DATABASE_URL ? '✅ Set' : '❌ Not set'}`);
  console.log(`NEXTAUTH_SECRET: ${process.env.NEXTAUTH_SECRET ? '✅ Set' : '❌ Not set'}`);
  console.log(`NEXTAUTH_URL: ${process.env.NEXTAUTH_URL || 'Not set (will use default)'}`);
  console.log(`DEPLOYMENT_MODE: ${process.env.DEPLOYMENT_MODE || 'Not set (will use auto)'}`);
  console.log(`USE_SERVERLESS_DB: ${process.env.USE_SERVERLESS_DB || 'Not set (will auto-detect)'}`);
  console.log(`DB_POOLING: ${process.env.DB_POOLING || 'Not set (will use defaults)'}`);
  
  // Check for potential issues
  console.log('\n🔍 Checking for potential issues...');
  
  if (config.runtime === 'edge' && !process.env.DATABASE_URL?.includes('neon.tech')) {
    console.warn('\n⚠️  Warning: Using edge runtime without Neon database.');
    console.warn('   Consider using Neon (https://neon.tech) for optimal edge performance.');
  }
  
  if (config.mode === 'edge' && config.runtime === 'node') {
    console.warn('\n⚠️  Warning: DEPLOYMENT_MODE is set to "edge" but detected Node.js runtime.');
    console.warn('   This may indicate a misconfiguration.');
  }
  
  if (!process.env.NEXTAUTH_SECRET) {
    console.error('\n❌ Error: NEXTAUTH_SECRET is not set!');
    console.error('   This is required for production deployments.');
  }
  
  // Platform-specific recommendations
  console.log('\n📝 Deployment Recommendations:');
  console.log('=============================');
  
  if (process.env.VERCEL === '1') {
    console.log('🚀 Deploying to Vercel:');
    console.log('   - Consider using edge runtime for better performance');
    console.log('   - Use Neon database for serverless compatibility');
    console.log('   - Set DEPLOYMENT_MODE=edge in your Vercel environment variables');
  } else if (config.runtime === 'edge') {
    console.log('🚀 Edge Runtime Deployment:');
    console.log('   - Ensure your database supports serverless connections');
    console.log('   - Monitor cold start performance');
    console.log('   - Consider using Vercel Edge or Cloudflare Workers');
  } else {
    console.log('🚀 Node.js Deployment:');
    console.log('   - Can use any PostgreSQL database');
    console.log('   - Connection pooling is recommended');
    console.log('   - Suitable for VPS, Docker, or traditional hosting');
  }
  
  console.log('\n✨ Deployment check complete!');
  
} catch (error) {
  console.error('\n❌ Configuration validation failed:');
  console.error(error);
  process.exit(1);
}