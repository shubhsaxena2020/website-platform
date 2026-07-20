/**
 * Rate Limiting Utility
 *
 * Provides in-memory rate limiting for API routes.
 * For production, consider using Redis-backed rate limiting.
 */

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

interface RateLimitConfig {
  windowMs: number;  // Time window in milliseconds
  maxRequests: number;  // Max requests per window
}

// In-memory store for rate limiting
const rateLimitStore = new Map<string, RateLimitEntry>();

// Default configurations for different endpoints
export const RATE_LIMIT_CONFIGS = {
  contact: {
    windowMs: 60 * 60 * 1000,  // 1 hour
    maxRequests: 5,  // 5 requests per hour
  },
  newsletter: {
    windowMs: 24 * 60 * 60 * 1000,  // 24 hours
    maxRequests: 3,  // 3 requests per day
  },
  api: {
    windowMs: 60 * 1000,  // 1 minute
    maxRequests: 60,  // 60 requests per minute
  },
} as const;

/**
 * Clean up expired entries from the store
 */
function cleanupStore(): void {
  const now = Date.now();
  for (const [key, entry] of rateLimitStore.entries()) {
    if (now > entry.resetTime) {
      rateLimitStore.delete(key);
    }
  }
}

/**
 * Get client identifier from request
 */
function getClientId(request: Request): string {
  // Try to get IP from various headers
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');

  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  if (realIp) {
    return realIp;
  }

  // Fallback to a default identifier
  return 'unknown';
}

/**
 * Check rate limit for a request
 *
 * @param request - The incoming request
 * @param config - Rate limit configuration
 * @returns Object with success status and retry information
 */
export function checkRateLimit(
  request: Request,
  config: RateLimitConfig = RATE_LIMIT_CONFIGS.api
): { success: boolean; retryAfter?: number; remaining?: number } {
  cleanupStore();

  const clientId = getClientId(request);
  const now = Date.now();
  const key = `${clientId}:${config.windowMs}`;

  const entry = rateLimitStore.get(key);

  if (!entry || now > entry.resetTime) {
    // First request or window expired
    rateLimitStore.set(key, {
      count: 1,
      resetTime: now + config.windowMs,
    });

    return {
      success: true,
      remaining: config.maxRequests - 1,
    };
  }

  if (entry.count >= config.maxRequests) {
    // Rate limit exceeded
    const retryAfter = Math.ceil((entry.resetTime - now) / 1000);
    return {
      success: false,
      retryAfter,
    };
  }

  // Increment count
  entry.count++;
  rateLimitStore.set(key, entry);

  return {
    success: true,
    remaining: config.maxRequests - entry.count,
  };
}

/**
 * Create rate limit response headers
 */
export function getRateLimitHeaders(
  remaining: number,
  retryAfter?: number
): Record<string, string> {
  const headers: Record<string, string> = {
    'X-RateLimit-Remaining': remaining.toString(),
  };

  if (retryAfter) {
    headers['Retry-After'] = retryAfter.toString();
  }

  return headers;
}

/**
 * Middleware-style rate limit check for API routes
 * Returns null if allowed, or NextResponse with 429 status if blocked
 */
export async function rateLimitMiddleware(
  request: Request,
  config: RateLimitConfig = RATE_LIMIT_CONFIGS.api
): Promise<{ allowed: boolean; headers: Record<string, string> }> {
  const result = checkRateLimit(request, config);

  if (result.success) {
    return {
      allowed: true,
      headers: getRateLimitHeaders(result.remaining!),
    };
  }

  return {
    allowed: false,
    headers: getRateLimitHeaders(0, result.retryAfter),
  };
}
