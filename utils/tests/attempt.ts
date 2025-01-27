import type { 
  TestAttemptSummary, 
  TestStatus 
} from "@/types/tests/progress"
import type { 
  QuestionResponse 
} from "@/types/tests/test-attempt"
import { calculateProgress} from './progress'

// Define the minimal structure needed for attempt data
interface BaseAttemptData {
  id: string
  testId: string
  startedAt: Date
  status: TestStatus
  responses: QuestionResponse[]
  test?: {
    title: string
    questions?: { id: string }[]
  }
  totalQuestions?: number
}

// Extend for different types
interface GuestAttemptData extends BaseAttemptData {
  guestId: string
}

interface UserAttemptData extends BaseAttemptData {
  userId: string
}

export const getAttemptStatus = (
  responses: QuestionResponse[], 
  totalQuestions: number
): TestStatus => {
  if (responses.length === 0) return 'NOT_STARTED'
  if (responses.length === totalQuestions) return 'COMPLETED'
  return 'IN_PROGRESS'
}

export const transformAttemptData = (
  attemptData: GuestAttemptData | UserAttemptData,
  isGuest: boolean = false
): TestAttemptSummary => {
  const progress = calculateProgress(
    attemptData.responses,
    attemptData.test?.questions?.length || attemptData.totalQuestions || 0
  )

  const base = {
    id: attemptData.id,
    testId: attemptData.testId,
    testTitle: attemptData.test?.title || "",
    startedAt: attemptData.startedAt,
    status: attemptData.status,
    progress
  }

  if (isGuest) {
    return {
      ...base,
      guestId: (attemptData as GuestAttemptData).guestId
    }
  }

  return {
    ...base,
    userId: (attemptData as UserAttemptData).userId
  }
}

export const normalizeAttemptData = (attempt: TestAttemptSummary) => {
  return {
    ...attempt,
    startedAt: new Date(attempt.startedAt),
    progress: {
      ...attempt.progress,
      percentageComplete: Math.round(attempt.progress.percentageComplete)
    }
  }
}