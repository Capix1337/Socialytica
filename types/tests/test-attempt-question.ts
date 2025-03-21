// types/tests/test-attempt-question.ts

export interface TestAttemptQuestion {
  id: string
  questionId: string
  testAttemptId: string
  question: {
    id: string
    title: string
    categoryId: string | null
    category: {
      id: string
      name: string
    } | null
    options: {
      id: string
      text: string
    }[]
  }
  selectedOptionId: string | null
  isAnswered: boolean
  createdAt: Date
  updatedAt: Date
}

export interface SubmitAnswerResponse {
  success: boolean
  pointsEarned?: number
  maxPoints?: number
  error?: string
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
  currentCategoryId: string | null
}

export interface TestAttemptQuestionError {
  message: string
  errors?: Record<string, string[]>
}

export interface BatchAnswerResponse {
  success: boolean
  results: Array<{
    questionId: string
    success: boolean
    error?: string
  }>
  error?: string
}