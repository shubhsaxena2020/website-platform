'use client';

import { useEffect } from 'react';
import {
  onCLS,
  onFCP,
  onINP,
  onLCP,
  onTTFB,
  type Metric,
} from 'web-vitals';

/**
 * Core Web Vitals thresholds (based on Google's recommended "good" thresholds)
 * - LCP: <= 2500ms
 * - FID/INP: <= 200ms
 * - CLS: <= 0.1
 * - FCP: <= 1800ms
 * - TTFB: <= 800ms
 */
export const THRESHOLDS = {
  LCP: 2500,
  INP: 200,
  CLS: 0.1,
  FCP: 1800,
  TTFB: 800,
} as const;

export type WebVitalsRating = 'good' | 'needs-improvement' | 'poor';

/**
 * Rate a metric value against its threshold
 */
function rateMetric(name: string, value: number): WebVitalsRating {
  const threshold = THRESHOLDS[name as keyof typeof THRESHOLDS];
  if (!threshold) return 'good';

  if (name === 'CLS') {
    // CLS is unitless
    if (value <= 0.1) return 'good';
    if (value <= 0.25) return 'needs-improvement';
    return 'poor';
  }

  if (value <= threshold) return 'good';
  if (value <= threshold * 1.5) return 'needs-improvement';
  return 'poor';
}

/**
 * Send metric to analytics endpoint
 */
function sendToAnalytics(metric: Metric) {
  const rating = rateMetric(metric.name, metric.value);

  const body = JSON.stringify({
    name: metric.name,
    value: metric.value,
    rating,
    delta: metric.delta,
    id: metric.id,
    navigationType: metric.navigationType,
  });

  // Use sendBeacon for non-blocking analytics
  if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
    navigator.sendBeacon('/api/web-vitals', body);
  } else {
    // Fallback: use fetch with keepalive
    fetch('/api/web-vitals', {
      body,
      method: 'POST',
      keepalive: true,
    }).catch(() => {
      // Silently fail - don't break the page for analytics
    });
  }

  // Log in development
  if (process.env.NODE_ENV === 'development') {
    console.log(
      `[Web Vitals] ${metric.name}: ${metric.value.toFixed(2)} (${rating})`,
      metric
    );
  }
}

export interface WebVitalsProps {
  /**
   * Custom analytics handler (overrides default sendToAnalytics)
   */
  onMetric?: (metric: Metric) => void;
  /**
   * Whether to enable Web Vitals tracking
   * @default true
   */
  enabled?: boolean;
}

/**
 * WebVitals component
 *
 * Tracks Core Web Vitals (LCP, INP, CLS, FCP, TTFB) and sends them
 * to the analytics endpoint. Place this component in the root layout.
 *
 * @example
 * ```tsx
 * // In layout.tsx
 * <WebVitals />
 * ```
 */
export function WebVitals({ onMetric, enabled = true }: WebVitalsProps) {
  useEffect(() => {
    if (!enabled) return;

    const handler = onMetric || sendToAnalytics;

    onCLS(handler);
    onFCP(handler);
    onINP(handler);
    onLCP(handler);
    onTTFB(handler);
  }, [enabled, onMetric]);

  // This component renders nothing
  return null;
}
