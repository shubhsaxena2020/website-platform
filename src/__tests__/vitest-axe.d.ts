import 'vitest';

declare module 'vitest-axe' {
  import type { AxeResults } from 'axe-core';

  interface MatcherResult {
    message(): string;
    pass: boolean;
  }

  interface NoViolationsMatcherResult extends MatcherResult {
    actual: AxeResults['violations'];
  }

  export function toHaveNoViolations(results: AxeResults): NoViolationsMatcherResult;
  export function axe(html: Element | string, options?: unknown): Promise<AxeResults>;
}

declare module 'vitest-axe/extend-expect' {
  import type { AxeResults } from 'axe-core';

  interface MatcherResult {
    message(): string;
    pass: boolean;
  }

  interface NoViolationsMatcherResult extends MatcherResult {
    actual: AxeResults['violations'];
  }
}

module 'vitest' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Assertion<T = unknown> {
    toHaveNoViolations(): import('vitest-axe').NoViolationsMatcherResult;
  }
  interface AsymmetricMatchersContaining {
    toHaveNoViolations(): import('vitest-axe').NoViolationsMatcherResult;
  }
}

export {};
