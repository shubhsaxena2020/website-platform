/// <reference types="vitest" />

import type { AxeResults } from 'axe-core';

interface MatcherResult {
  message(): string;
  pass: boolean;
}

interface NoViolationsMatcherResult extends MatcherResult {
  actual: AxeResults['violations'];
}

declare module 'vitest' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Assertion<T = unknown> {
    toHaveNoViolations(): NoViolationsMatcherResult;
  }
  interface AsymmetricMatchersContaining {
    toHaveNoViolations(): NoViolationsMatcherResult;
  }
}
