import { NextResponse } from 'next/server';
import { checkRateLimit, RATE_LIMIT_CONFIGS, getRateLimitHeaders } from '@/lib/rate-limit';

interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  message: string;
}

export async function POST(request: Request) {
  try {
    // Apply rate limiting
    const rateLimitResult = checkRateLimit(request, RATE_LIMIT_CONFIGS.contact);

    if (!rateLimitResult.success) {
      return NextResponse.json(
        {
          error: 'Too many requests. Please try again later.',
          retryAfter: rateLimitResult.retryAfter,
        },
        {
          status: 429,
          headers: getRateLimitHeaders(0, rateLimitResult.retryAfter),
        }
      );
    }

    const body: ContactFormData = await request.json();

    // Validate required fields
    if (!body.name?.trim() || !body.email?.trim() || !body.message?.trim()) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
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

    // Validate message length
    if (body.message.trim().length < 10) {
      return NextResponse.json(
        { error: 'Message must be at least 10 characters' },
        { status: 400 }
      );
    }

    // In a real application, you would:
    // 1. Send an email notification
    // 2. Store the submission in a database
    // 3. Send a confirmation email to the user
    // For now, we'll simulate processing
    console.log('Contact form submission:', {
      name: body.name,
      email: body.email,
      company: body.company || 'N/A',
      message: body.message,
      timestamp: new Date().toISOString(),
    });

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    return NextResponse.json(
      { message: 'Message received successfully' },
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
