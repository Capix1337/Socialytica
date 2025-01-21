import type {  Category } from "@prisma/client"

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
  }
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