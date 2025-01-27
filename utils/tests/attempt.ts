import type { 
  TestAttemptSummary, 
  TestStatus 
} from "@/types/tests/progress"
import type { 
  QuestionResponse 
} from "@/types/tests/test-attempt"
import type { GuestAttemptSummary } from '@/types/tests/guest-attempt'
// import { calculateProgress} from './progress'

// Define the minimal structure needed for attempt data
interface BaseAttemptData {
  id: string
  testId: string
  startedAt: number | Date // Allow both number and Date
  status: TestStatus
  responses: GuestTestResponse[] | QuestionResponse[] // Accept both types
  test?: {
    title: string  // This is required
    questions?: { id: string }[]
  }
  totalQuestions?: number
}

// Extend for different types
interface GuestAttemptData extends BaseAttemptData {
  guestId: string
  responses: GuestTestResponse[] // Guest specific responses
}

interface UserAttemptData extends BaseAttemptData {
  userId: string
  responses: QuestionResponse[] // User specific responses
}

export const getAttemptStatus = (
  responses: QuestionResponse[], 
  totalQuestions: number
): TestStatus => {
  if (responses.length === 0) return 'IN_PROGRESS' // Changed from NOT_STARTED
  if (responses.length === totalQuestions) return 'COMPLETED'
  return 'IN_PROGRESS'
}

export const transformAttemptData = (
  attemptData: GuestAttemptData | UserAttemptData,
  isGuest: boolean = false
): TestAttemptSummary => {
  const base = {
    id: attemptData.id,
    testId: attemptData.testId,
    testTitle: attemptData.test?.title || "",
    startedAt: typeof attemptData.startedAt === 'number' 
      ? attemptData.startedAt 
      : new Date(attemptData.startedAt).getTime(),
    status: attemptData.status,
    progress: {
      answeredQuestions: attemptData.responses.length,
      totalQuestions: attemptData.test?.questions?.length || 0,
      percentageComplete: Math.round(
        (attemptData.responses.length / (attemptData.test?.questions?.length || 1)) * 100
      )
    }
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

interface AttemptDataToNormalize {
  startedAt: Date | number
  progress: {
    answeredQuestions: number
    totalQuestions: number
    percentageComplete: number
  }
  id: string
  testId: string
  testTitle: string
  status: TestStatus
  guestId?: string // Make guestId optional
  score?: {
    totalScore: number
    percentageScore: number
  }
}

export const normalizeAttemptData = (attempt: AttemptDataToNormalize): GuestAttemptSummary => {
  return {
    ...attempt,
    startedAt: attempt.startedAt instanceof Date 
      ? attempt.startedAt.getTime() 
      : attempt.startedAt,
    progress: {
      answeredQuestions: attempt.progress.answeredQuestions,
      totalQuestions: attempt.progress.totalQuestions,
      percentageComplete: Math.round(attempt.progress.percentageComplete)
    }
  }
}