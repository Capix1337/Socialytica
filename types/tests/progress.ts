export type TestStatus = 'IN_PROGRESS' | 'COMPLETED' | 'ABANDONED'

export interface TestProgress {
  answeredQuestions: number
  totalQuestions: number
  percentageComplete: number
}

export interface TestScore {
  totalScore: number
  percentageScore: number
}

export interface BaseAttemptSummary {
  id: string
  testId: string
  testTitle: string
  startedAt: Date
  status: TestStatus
  progress: TestProgress
  score?: TestScore
}

export interface GuestAttemptSummary {
  id: string
  testId: string
  testTitle: string
  startedAt: number // Changed from Date to number
  status: TestStatus
  guestId: string
  progress: {
    answeredQuestions: number
    totalQuestions: number
    percentageComplete: number
  }
  score?: {
    totalScore: number
    percentageScore: number
  }
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

export interface GuestCategoryProgress {
  currentCategoryIndex: number
  completedCategories: string[]
  lastUpdated: number
  categoryTransitions: Array<{
    fromCategoryId: string
    toCategoryId: string
    timestamp: number
  }>
}