import type { TestAttempt, GuestAttemptSummary } from "@/types/tests/test-attempt"

// lib/utils/type-guards.ts
export function isGuestAttempt(
  attempt: TestAttempt | GuestAttemptSummary
): attempt is GuestAttemptSummary {
  return 'testSlug' in attempt
}

export const isTestAttempt = (
  attempt: TestAttempt | GuestAttemptSummary
): attempt is TestAttempt => {
  return 'completedAt' in attempt && 'test' in attempt;
}