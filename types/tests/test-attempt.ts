// types/tests/test-attempt.ts

import { Test } from "./test"
import { Question } from "./question"
import { Option } from "./option"
// import { Category } from "./category"

export type TestStatus = 'IN_PROGRESS' | 'COMPLETED' | 'ABANDONED'

export interface QuestionResponse {
  id: string
  testAttemptId: string
  questionId: string
  selectedOptionId: string
  pointsEarned: number
  maxPoints: number
  question: Question
  selectedOption: Option
  createdAt: Date
  updatedAt: Date
}

export interface CategoryScore {
  id: string
  testAttemptId: string
  categoryId: string
  actualScore: number
  maxScale: number
  rawScore: number
  maxRawScore: number
  scaledScore: number
  category: {
    id: string
    name: string
    description: string // Make this required but possibly empty
    scale: number
    testId: string
    createdAt: Date
    updatedAt: Date
  }
  createdAt: Date
  updatedAt: Date
}

export interface TestAttempt {
  id: string
  userId?: string
  guestId?: string // Add this for guest attempts
  testId: string
  startedAt: Date
  completedAt: Date | null
  status: TestStatus
  totalScore: number | null
  percentageScore: number | null
  test?: Test
  responses?: QuestionResponse[]
  categoryScores?: CategoryScore[]
  createdAt?: Date
  updatedAt?: Date
}

export interface TestAttemptResult {
  test: {
    name: string   // Add this field
  }
  totalScore: number
  maxScore: number
  percentageScore: number
  categoryScores: CategoryScore[]
  responses: QuestionResponse[]
}

export interface TestAttemptResponse {
  testAttempt: TestAttempt
}

export interface TestAttemptsResponse {
  testAttempts: TestAttempt[]
  totalAttempts: number
  currentPage: number
  totalPages: number
}

export interface TestAttemptError {
  message: string
  errors?: Record<string, string[]>
}

export interface CreateTestAttemptInput {
  testId: string
}

export interface TestAttemptApiResponse {
  testAttempt: {
    id: string
    testId: string
    userId?: string
    guestId?: string
    startedAt: Date
    status: TestStatus
  }
}

export interface CategoryCompletion {
  categoryId: string
  rawScore: number
  maxRawScore: number
  scaledScore: number
  maxScale: number
}

export interface TestCompletion {
  testAttemptId: string
  categoryScores: CategoryCompletion[]
  totalScore: number
  percentageScore: number
}

export interface TestCompletionResponse {
  success: boolean
  result?: {
    testAttemptId: string
    totalScore: number
    percentageScore: number
    categoryScores: CategoryCompletion[]
  }
  error?: string
}

// Add these new types to test-attempt.ts

export interface GuestAttemptData {
  attemptId: string;
  guestId: string;
  testId: string;
  startedAt: Date;
  status: TestStatus;
  responses?: QuestionResponse[];
  categoryScores?: CategoryScore[];
}

export interface GuestAttemptResponse {
  success: boolean;
  attempt?: GuestAttemptData;
  error?: string;
}

export interface GuestTestAttemptData {
  testId: string;
  isGuest: boolean;
  guestId?: string;
}