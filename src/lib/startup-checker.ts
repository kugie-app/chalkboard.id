/**
 * Application Startup Checker
 * Runs comprehensive checks during app initialization
 */

import { runStartupHealthChecks, type StartupHealthReport } from './database-health';
import { getDeploymentConfig, validateDeploymentConfig } from './deployment-config';

export interface StartupStatus {
  isReady: boolean;
  healthReport: StartupHealthReport | null;
  errors: string[];
  warnings: string[];
  startupTime: number;
  timestamp: Date;
}

/**
 * Run all startup checks and return status
 */
export async function performStartupChecks(): Promise<StartupStatus> {
  const startTime = Date.now();
  const errors: string[] = [];
  const warnings: string[] = [];
  let healthReport: StartupHealthReport | null = null;

  console.log('🚀 Starting application initialization...');
  console.log('');

  try {
    // 1. Validate deployment configuration
    console.log('⚙️  Validating deployment configuration...');
    try {
      validateDeploymentConfig();
      console.log('✅ Deployment configuration valid');
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Configuration validation failed';
      errors.push(errorMsg);
      console.error('❌ Configuration error:', errorMsg);
    }

    // 2. Display deployment info
    const config = getDeploymentConfig();
    console.log('');
    console.log('📋 Deployment Information:');
    console.log(`   Mode: ${config.mode}`);
    console.log(`   Runtime: ${config.runtime}`);
    console.log(`   Database Provider: ${config.provider}`);
    console.log(`   Version: ${config.versioning.currentVersion}`);
    console.log(`   Pooling: ${config.database.pooling ? 'Enabled' : 'Disabled'}`);
    console.log('');

    // 3. Run database health checks
    console.log('🔍 Checking database health...');
    healthReport = await runStartupHealthChecks();

    // 4. Analyze results
    if (healthReport.overall === 'error') {
      Object.values(healthReport.checks).forEach(check => {
        if (check.status === 'error') {
          errors.push(`${check.message}: ${check.details || 'No details'}`);
        }
      });
    }

    if (healthReport.overall === 'warning' || healthReport.overall === 'error') {
      Object.values(healthReport.checks).forEach(check => {
        if (check.status === 'warning') {
          warnings.push(`${check.message}: ${check.details || 'No details'}`);
        }
      });
    }

    // 5. Final status determination
    const isReady = errors.length === 0;
    const startupTime = Date.now() - startTime;

    console.log('');
    console.log('🎯 Startup Summary:');
    console.log(`   Status: ${isReady ? '✅ READY' : '❌ NOT READY'}`);
    console.log(`   Health: ${healthReport.overall.toUpperCase()}`);
    console.log(`   Startup Time: ${startupTime}ms`);
    
    if (errors.length > 0) {
      console.log(`   Errors: ${errors.length}`);
      errors.forEach(error => console.log(`     • ${error}`));
    }
    
    if (warnings.length > 0) {
      console.log(`   Warnings: ${warnings.length}`);
      warnings.forEach(warning => console.log(`     • ${warning}`));
    }

    console.log('');
    
    if (isReady) {
      console.log('🎉 Application ready to serve requests!');
    } else {
      console.log('⚠️  Application startup incomplete - check errors above');
    }

    console.log('');

    return {
      isReady,
      healthReport,
      errors,
      warnings,
      startupTime,
      timestamp: new Date(),
    };

  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : 'Unknown startup error';
    errors.push(`Startup check failed: ${errorMsg}`);
    
    console.error('💥 Startup check failed:', error);
    
    return {
      isReady: false,
      healthReport,
      errors,
      warnings,
      startupTime: Date.now() - startTime,
      timestamp: new Date(),
    };
  }
}

/**
 * Quick health check for API endpoints
 */
export async function quickHealthCheck(): Promise<{
  status: 'healthy' | 'degraded' | 'unhealthy';
  checks: Record<string, boolean>;
  timestamp: Date;
}> {
  try {
    const healthReport = await runStartupHealthChecks();
    
    const checks = {
      database: healthReport.checks.connection.status === 'healthy',
      schema: healthReport.checks.schema.status !== 'error',
      permissions: healthReport.checks.permissions.status === 'healthy',
    };

    const allHealthy = Object.values(checks).every(check => check);
    const anyUnhealthy = Object.values(checks).some(check => !check);

    return {
      status: allHealthy ? 'healthy' : anyUnhealthy ? 'degraded' : 'unhealthy',
      checks,
      timestamp: new Date(),
    };
  } catch (error) {
    return {
      status: 'unhealthy',
      checks: {
        database: false,
        schema: false,
        permissions: false,
      },
      timestamp: new Date(),
    };
  }
}

// Global startup status cache
let startupStatusCache: StartupStatus | null = null;
let startupPromise: Promise<StartupStatus> | null = null;

/**
 * Get startup status (cached or run checks)
 */
export async function getStartupStatus(): Promise<StartupStatus> {
  // Return cached status if available and recent (within 30 seconds)
  if (startupStatusCache && 
      Date.now() - startupStatusCache.timestamp.getTime() < 30000) {
    return startupStatusCache;
  }

  // If startup check is already running, wait for it
  if (startupPromise) {
    return startupPromise;
  }

  // Run new startup check
  startupPromise = performStartupChecks();
  startupStatusCache = await startupPromise;
  startupPromise = null;

  return startupStatusCache;
}