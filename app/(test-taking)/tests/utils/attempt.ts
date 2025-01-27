// app/(test-taking)/tests/utils/attempt.ts
import type { TestAttempt } from "@/types/tests/test-attempt"
import type { GuestAttemptSummary } from "@/types/tests/guest-attempt"
import type { TestProgress } from "@/types/tests/progress"

export function isGuestAttempt(attempt: TestAttempt | GuestAttemptSummary): attempt is GuestAttemptSummary {
  return 'progress' in attempt
}

export function isTestAttempt(attempt: TestAttempt | GuestAttemptSummary): attempt is TestAttempt {
  return 'test' in attempt && 'responses' in attempt
}

export function getAttemptProgress(attempt: TestAttempt | GuestAttemptSummary): TestProgress {
  // Handle guest attempt using isGuestAttempt type guard
  if (isGuestAttempt(attempt)) {
    return {
      answeredQuestions: attempt.progress.answeredQuestions,
      totalQuestions: attempt.progress.totalQuestions,
      percentageComplete: attempt.progress.percentageComplete
    }
  }

  // Handle test attempt using isTestAttempt type guard
  if (isTestAttempt(attempt)) {
    const totalQuestions = attempt.test?.questions?.length || 0
    const answeredQuestions = attempt.responses?.length || 0
    
    return {
      answeredQuestions,
      totalQuestions,
      percentageComplete: totalQuestions > 0 
        ? Math.round((answeredQuestions / totalQuestions) * 100)
        : 0
    }
  }

  // Fallback for unexpected cases
  return {
    answeredQuestions: 0,
    totalQuestions: 0,
    percentageComplete: 0
  }
}