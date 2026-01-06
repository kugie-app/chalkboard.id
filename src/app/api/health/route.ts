import { NextResponse } from 'next/server'

export async function GET() {
  const timestamp = new Date().toISOString()
  
  try {
    // Basic health check without database dependency during startup
    const health: any = {
      status: 'healthy',
      timestamp,
      version: process.env.npm_package_version || '4.0.0',
      environment: process.env.NODE_ENV || 'development',
      deployment: process.env.DEPLOYMENT_MODE || 'unknown',
      port: process.env.PORT || '3000'
    }

    // Try database connection with timeout, but don't fail health check if DB is temporarily unavailable
    try {
      const { db } = await import('@/lib/db')
      await Promise.race([
        db.execute('SELECT 1'),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Database timeout')), 5000))
      ])
      health.database = 'connected'
    } catch (dbError) {
      console.warn('Database check failed during health check:', dbError)
      health.database = 'unavailable'
      // Don't fail the health check for database issues during startup
    }
    
    return NextResponse.json(health, { status: 200 })
  } catch (error) {
    console.error('Health check failed:', error)
    
    return NextResponse.json(
      { 
        status: 'unhealthy',
        timestamp,
        error: error instanceof Error ? error.message : 'Unknown error',
        environment: process.env.NODE_ENV || 'development'
      },
      { status: 503 }
    )
  }
}