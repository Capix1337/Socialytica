import type { TestAttempt } from "@/types/tests/test-attempt"
import type { GuestAttemptSummary } from "@/types/tests/guest-attempt"

// lib/utils/type-guards.ts
export const isGuestAttempt = (
  attempt: TestAttempt | GuestAttemptSummary
): attempt is GuestAttemptSummary => {
  return 'testTitle' in attempt && 'progress' in attempt;
}

export const isTestAttempt = (
  attempt: TestAttempt | GuestAttemptSummary
): attempt is TestAttempt => {
  return 'completedAt' in attempt && 'test' in attempt;
}