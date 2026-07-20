import { NextResponse } from 'next/server';
import { checkRateLimit, RATE_LIMIT_CONFIGS, getRateLimitHeaders } from '@/lib/rate-limit';

interface NewsletterFormData {
  email: string;
}

/**
 * Newsletter Subscription API
 *
 * Handles newsletter email subscriptions with rate limiting.
 */
export async function POST(request: Request) {
  try {
    // Apply rate limiting
    const rateLimitResult = checkRateLimit(request, RATE_LIMIT_CONFIGS.newsletter);

    if (!rateLimitResult.success) {
      return NextResponse.json(
        {
          error: 'Too many subscription attempts. Please try again later.',
          retryAfter: rateLimitResult.retryAfter,
        },
        {
          status: 429,
          headers: getRateLimitHeaders(0, rateLimitResult.retryAfter),
        }
      );
    }

    const body: NewsletterFormData = await request.json();

    // Validate email
    if (!body.email?.trim()) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // In a real application, you would:
    // 1. Check if email already exists
    // 2. Store in database
    // 3. Send confirmation email
    // 4. Add to email marketing platform
    console.log('Newsletter subscription:', {
      email: body.email,
      timestamp: new Date().toISOString(),
    });

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    return NextResponse.json(
      {
        message: 'Successfully subscribed to newsletter',
        email: body.email,
      },
      {
        status: 200,
        headers: getRateLimitHeaders(rateLimitResult.remaining ?? 0),
      }
    );
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * GET method to check subscription status (placeholder)
 */
export async function GET() {
  return NextResponse.json(
    {
      message: 'Newsletter subscription endpoint',
      methods: ['POST'],
    },
    { status: 200 }
  );
}
