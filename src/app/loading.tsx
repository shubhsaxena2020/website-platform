'use client';

import { useEffect, useState } from 'react';

/**
 * Root Loading State
 *
 * Displays an animated spinner during route transitions.
 * Provides instant feedback while page content loads.
 */
export default function Loading() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Small delay to prevent flash on fast loads
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm"
      role="status"
      aria-label="Loading"
    >
      <div className="flex flex-col items-center gap-4">
        {/* Animated spinner */}
        <div className="relative">
          <div className="w-12 h-12 rounded-full border-4 border-gray-200 dark:border-gray-700" />
          <div className="absolute top-0 left-0 w-12 h-12 rounded-full border-4 border-transparent border-t-blue-600 animate-spin" />
        </div>

        {/* Loading text */}
        <p className="text-sm font-medium text-gray-600 dark:text-gray-400 animate-pulse">
          Loading...
        </p>
      </div>

      {/* Screen reader only text */}
      <span className="sr-only">Loading page content...</span>
    </div>
  );
}
