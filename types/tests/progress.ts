export interface TestProgress {
  answeredQuestions: number
  totalQuestions: number
  percentageComplete: number
}

export interface TestScore {
  totalScore: number
  percentageScore: number
}

export type TestStatus = 'IN_PROGRESS' | 'COMPLETED' | 'ABANDONED'

export interface BaseAttemptSummary {
  id: string
  testId: string
  testTitle: string
  startedAt: Date
  status: TestStatus
  progress: TestProgress
  score?: TestScore
}

export interface GuestAttemptSummary extends BaseAttemptSummary {
  guestId: string
}

export interface UserAttemptSummary extends BaseAttemptSummary {
  userId: string
}

export type TestAttemptSummary = GuestAttemptSummary | UserAttemptSummary

export interface TestAttemptBase {
  id: string
  testId: string
  startedAt: Date
  status: TestStatus
  progress: TestProgress
}

export interface UserAttempt extends TestAttemptBase {
  test: {
    id: string
    title: string
    questions: Array<{ id: string }>
  }
  responses: Array<{
    id: string
    questionId: string
    selectedOptionId: string
  }>
}