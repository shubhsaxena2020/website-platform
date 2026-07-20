import { NextResponse } from 'next/server';

interface HealthStatus {
  status: 'healthy' | 'degraded' | 'unhealthy';
  timestamp: string;
  uptime: number;
  version: string;
  environment: string;
  memory?: {
    rss: number;
    heapUsed: number;
    heapTotal: number;
    external: number;
  };
  checks?: {
    database: 'ok' | 'error';
    cache: 'ok' | 'error';
  };
}

/**
 * Health Check Endpoint
 *
 * Returns the health status of the application.
 * Useful for monitoring, load balancers, and deployment verification.
 */
export async function GET() {
  const startTime = Date.now();

  try {
    // Get memory usage
    const memoryUsage = process.memoryUsage();

    // Determine health status based on memory usage
    const heapUsedMB = memoryUsage.heapUsed / 1024 / 1024;
    const heapTotalMB = memoryUsage.heapTotal / 1024 / 1024;
    const heapUsagePercent = (heapUsedMB / heapTotalMB) * 100;

    let status: HealthStatus['status'] = 'healthy';

    if (heapUsagePercent > 90) {
      status = 'unhealthy';
    } else if (heapUsagePercent > 70) {
      status = 'degraded';
    }

    const healthStatus: HealthStatus = {
      status,
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      version: process.env.npm_package_version || '1.0.0',
      environment: process.env.NODE_ENV || 'development',
      memory: {
        rss: memoryUsage.rss,
        heapUsed: memoryUsage.heapUsed,
        heapTotal: memoryUsage.heapTotal,
        external: memoryUsage.external,
      },
      checks: {
        database: 'ok',  // In a real app, check database connection
        cache: 'ok',     // In a real app, check cache connection
      },
    };

    const responseTime = Date.now() - startTime;

    return NextResponse.json(healthStatus, {
      status: status === 'unhealthy' ? 503 : 200,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'X-Response-Time': `${responseTime}ms`,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      {
        status: 503,
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        },
      }
    );
  }
}

/**
 * HEAD method for simple health checks
 */
export async function HEAD() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    },
  });
}
