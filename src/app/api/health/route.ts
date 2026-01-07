import { NextRequest, NextResponse } from 'next/server';
import { quickHealthCheck, getStartupStatus } from '@/lib/startup-checker';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const detailed = searchParams.get('detailed') === 'true';

    if (detailed) {
      // Return detailed startup status
      const status = await getStartupStatus();
      
      return NextResponse.json({
        status: status.isReady ? 'healthy' : 'unhealthy',
        ready: status.isReady,
        startupTime: status.startupTime,
        timestamp: status.timestamp,
        health: status.healthReport,
        errors: status.errors,
        warnings: status.warnings,
        version: process.env.npm_package_version || '4.0.0',
        environment: process.env.NODE_ENV || 'development',
        deployment: process.env.DEPLOYMENT_MODE || 'unknown',
      });
    } else {
      // Return quick health check
      const health = await quickHealthCheck();
      
      return NextResponse.json({
        status: health.status,
        checks: health.checks,
        timestamp: health.timestamp,
        uptime: process.uptime(),
        version: process.env.npm_package_version || '4.0.0',
        environment: process.env.NODE_ENV || 'development',
        deployment: process.env.DEPLOYMENT_MODE || 'unknown',
      });
    }
  } catch (error) {
    return NextResponse.json(
      {
        status: 'unhealthy',
        error: error instanceof Error ? error.message : 'Health check failed',
        timestamp: new Date(),
        version: process.env.npm_package_version || '4.0.0',
        environment: process.env.NODE_ENV || 'development',
      },
      { status: 503 }
    );
  }
}