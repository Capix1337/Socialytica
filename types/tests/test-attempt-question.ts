// types/tests/test-attempt-question.ts

export interface TestAttemptQuestion {
  id: string
  questionId: string          // Add this
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
  currentCategoryId: string | null // Add this field
}

export interface TestAttemptQuestionError {
  message: string
  errors?: Record<string, string[]>
}