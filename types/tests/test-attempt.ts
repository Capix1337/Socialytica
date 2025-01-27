// types/tests/test-attempt.ts

// import { Test } from "./test"
import { Question } from "./question"
import { Option } from "./option"
import { TestAttemptQuestion } from "./test-attempt-question" // Add this import
import type { TestProgress, TestScore, TestStatus } from './progress'

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
  currentCategoryId: string | null // Add this
  test?: {
    id: string
    title: string
    questions: Array<{ id: string }>
  }
  responses?: Array<{
    id: string
    questionId: string
    selectedOptionId: string
  }>
  createdAt?: Date
  updatedAt?: Date
  progress: TestProgress
  score?: TestScore
}

export interface TestResponse {
  questionId: string
  selectedOptionId: string
  isCorrect?: boolean
}

// Common interface for category score display
export interface DisplayCategoryScore {
  category: {
    id: string
    name: string
    description: string | null
    scale: number
    testId: string
  }
  scaledScore: number
  maxScale: number
  percentage: number
}

// Update TestAttemptResult interface
export interface TestAttemptResult {
  test: {
    name: string   // Add this field
  }
  totalScore: number
  maxScore: number
  percentageScore: number
  categoryScores: DisplayCategoryScore[]
  responses: QuestionResponse[]
}

// Update GuestAttemptResult interface
export interface GuestAttemptResult {
  isBlurred: boolean
  needsAuth: boolean
  test: {
    name: string
  }
  totalScore: number
  maxScore: number
  percentageScore: number
  categoryScores: DisplayCategoryScore[]
}

export interface TestAttemptResponse {
  testAttempt: TestAttempt
}

export interface TestAttemptsResponse {
  inProgress: TestAttemptSummary[]
  completed: TestAttemptSummary[]
  totalInProgress: number
  totalCompleted: number
}

export interface TestAttemptError {
  message: string
  errors?: Record<string, string[]>
}

export interface CreateTestAttemptInput {
  testId: string
  guestId?: string
}

export interface UpdateTestAttemptInput {
  response: TestResponse
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
  attemptId: string;
  testId: string;
  guestId: string;  // Add this
  responses: {
    questionId: string;
    selectedOptionId: string;
    pointsEarned: number;
    maxPoints: number;
  }[];
  startedAt: number;
  status: 'IN_PROGRESS' | 'COMPLETED' | 'ABANDONED';
  categoryScores?: {
    categoryId: string;
    actualScore: number;
    maxScale: number;
    rawScore: number;
    maxRawScore: number;
  }[];
}

export interface TestAttemptQuestionsResponse {
  questions: TestAttemptQuestion[]
  totalQuestions: number
  answeredQuestions: number
  categories: {
    id: string
    name: string
    isCompleted: boolean
  }[]
  nextCategoryId: string | null
}

// Add these new types for category progression
export interface CategoryProgression {
  currentCategoryId: string
  nextCategoryId: string | null
  isCompleted: boolean
  progress: {
    answeredQuestions: number
    totalQuestions: number
    percentage: number
  }
}

export interface CategoryTransitionState {
  fromCategory: {
    id: string
    name: string
    isCompleted: boolean
  }
  toCategory: {
    id: string
    name: string
  } | null
  timestamp: Date
}

export interface CategoryState {
  id: string
  name: string
  isCompleted: boolean
  progress: {
    answeredQuestions: number
    totalQuestions: number
    percentage: number
  }
  transitionState?: CategoryTransitionState
}

// Update TestAttemptQuestionsResponse to include category info
export interface TestAttemptQuestionsResponse {
  questions: TestAttemptQuestion[]
  totalQuestions: number
  answeredQuestions: number
  currentCategory: {
    id: string
    name: string
    progress: {
      answered: number
      total: number
      percentage: number
    }
  }
  nextCategory: {
    id: string
    name: string
  } | null
}

export interface TestAttemptSummary {
  id: string
  testId: string
  testTitle: string
  startedAt: Date
  status: TestStatus
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