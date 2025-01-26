import type {  Category } from "@prisma/client"
import { TestStatus } from './test-attempt'

export interface GuestAttemptApiResponse {
  guestAttempt: {
    id: string
    guestId: string
    testId: string
    startedAt: Date
    status: string
    expiresAt: Date
  }
}

export interface GuestAttemptDetails {
  id: string
  guestId: string
  test: {
    title: string
    description?: string | null
    categories: {
      id: string
      name: string
      description?: string | null
      scale: number
    }[]
  }
  startedAt: Date
  status: string
  expiresAt: Date
  progress: {
    totalResponses: number
    categoryScores?: {
      categoryId: string
      actualScore: number
      maxScale: number
    }[]
  }
}

export interface GuestAttemptQuestion {
  id: string
  attemptId: string
  title: string
  category: {
    id: string
    name: string
  } | null  // Add null as a possible type
  options: {
    id: string
    text: string
  }[]
  selectedOptionId: string | null
}

export interface GuestAttemptQuestionsResponse {
  questions: GuestAttemptQuestion[]
  totalQuestions: number
  answeredQuestions: number
}

export interface SubmitGuestAnswerResponse {
  success: boolean
  error?: string
}

export interface GuestCompletionResponse {
  success: boolean
  result?: {
    attemptId: string
    totalScore: number
    percentageScore: number
    categoryScores: {
      categoryId: string
      rawScore: number
      maxRawScore: number
      scaledScore: number
      maxScale: number
    }[]
  }
  error?: string
}

export interface GuestAttemptResult {
  isBlurred: boolean
  needsAuth: boolean
  test: {
    name: string
  }
  totalScore: number
  maxScore: number
  percentageScore: number
  categoryScores: {
    category: Category
    scaledScore: number
    maxScale: number
    percentage: number
  }[]
}

export interface GuestMigrationResponse {
  success: boolean
  migratedAttemptIds?: string[]
  error?: string
}

// Add these new interfaces
export interface GuestAttemptSummary {
  id: string
  testId: string
  testTitle: string
  startedAt: number
  status: 'IN_PROGRESS' | 'COMPLETED' | 'ABANDONED'
  guestId: string  // Add this field
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

export interface GuestTestProgress {
  answeredQuestions: number
  totalQuestions: number
  percentageComplete: number
  categoryProgress: {
    categoryId: string
    categoryName: string
    answeredQuestions: number
    totalQuestions: number
  }[]
}

export interface GuestAttemptsResponse {
  inProgress: GuestAttemptSummary[]
  completed: GuestAttemptSummary[]
  totalInProgress: number
  totalCompleted: number
}

export interface GuestAttempt {
  id: string
  guestId: string
  testId: string
  startedAt: Date
  completedAt: Date | null
  status: TestStatus
  currentCategoryId: string | null
  expiresAt: Date
  responses?: Array<{
    questionId: string
    selectedOptionId: string
    pointsEarned: number
    maxPoints: number
  }>
  categoryScores?: Array<{
    categoryId: string
    actualScore: number
    maxScale: number
    rawScore: number
    maxRawScore: number
  }>
}