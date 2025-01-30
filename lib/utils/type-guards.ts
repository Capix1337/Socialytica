import type { TestAttempt } from "@/types/tests/test-attempt"
import type { GuestAttemptSummary } from "@/types/tests/guest-attempt"

/**
 * Type guard to check if an attempt is a GuestAttemptSummary
 */
export function isGuestAttempt(
  attempt: TestAttempt | GuestAttemptSummary
): attempt is GuestAttemptSummary {
  return (
    'testSlug' in attempt && 
    'testTitle' in attempt && 
    !('test' in attempt)
  )
}

/**
 * Type guard to check if an attempt is a TestAttempt
 */
export function isTestAttempt(
  attempt: TestAttempt | GuestAttemptSummary
): attempt is TestAttempt {
  return (
    'test' in attempt &&
    'completedAt' in attempt &&
    !('testSlug' in attempt)
  )
}

/**
 * Type guard to check if the attempt is in progress
 */
export function isInProgress(
  attempt: TestAttempt | GuestAttemptSummary
): boolean {
  return attempt.status === 'IN_PROGRESS'
}

/**
 * Type guard to check if the attempt is completed
 */
export function isCompleted(
  attempt: TestAttempt | GuestAttemptSummary
): boolean {
  return attempt.status === 'COMPLETED'
}