import { NextResponse } from 'next/server';

/**
 * POST /api/web-vitals
 *
 * Receives Core Web Vitals metrics from the client-side WebVitals component.
 * In production, this would store metrics in a database or forward to an
 * analytics service (e.g., Google Analytics, Datadog, etc.).
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name, value, rating, delta, id, navigationType } = body;

    // Validate required fields
    if (!name || typeof value !== 'number') {
      return NextResponse.json(
        { error: 'Invalid metric data' },
        { status: 400 }
      );
    }

    // Log in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Web Vitals] ${name}: ${value.toFixed(2)} (${rating})`);
    }

    // In production, you would:
    // 1. Store in a time-series database (e.g., ClickHouse, TimescaleDB)
    // 2. Forward to analytics services
    // 3. Alert on threshold violations
    // 4. Feed into dashboards

    // For now, we just acknowledge receipt
    return NextResponse.json({
      success: true,
      metric: { name, value, rating, delta, id, navigationType },
    });
  } catch {
    return NextResponse.json(
      { error: 'Failed to process metric' },
      { status: 500 }
    );
  }
}
