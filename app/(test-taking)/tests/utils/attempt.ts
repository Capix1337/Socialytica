// app/(test-taking)/tests/utils/attempt.ts
import type { TestAttempt } from "@/types/tests/test-attempt"
import type { GuestAttemptSummary } from "@/types/tests/guest-attempt"

export function getAttemptProgress(attempt: TestAttempt | GuestAttemptSummary) {
  if ('progress' in attempt) {
    // This is a GuestAttemptSummary
    return {
      answeredQuestions: attempt.progress.answeredQuestions,
      totalQuestions: attempt.progress.totalQuestions,
      progress: attempt.progress.percentageComplete
    }
  }
  
  // This is a TestAttempt
  const answeredQuestions = attempt.responses?.length ?? 0
  const totalQuestions = attempt.test?._count?.questions ?? 0
  return {
    answeredQuestions,
    totalQuestions,
    progress: totalQuestions > 0 ? Math.round((answeredQuestions / totalQuestions) * 100) : 0
  }
}