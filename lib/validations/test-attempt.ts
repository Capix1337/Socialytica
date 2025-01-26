//lib/validation/test-attempt.ts
import * as z from "zod"

// Schema for a question response when submitting answers
export const questionResponseSchema = z.object({
  questionId: z.string().cuid("Invalid question ID"),
  selectedOptionId: z.string().cuid("Invalid option ID")
})

// Schema for starting a test attempt
export const startTestAttemptSchema = z.object({
  testId: z.string().uuid("Invalid test ID format"),
  guestId: z.string().uuid("Invalid guest ID").optional() // Add optional guestId
})

// Schema for submitting test responses
export const submitTestResponsesSchema = z.object({
  testAttemptId: z.string().cuid("Invalid test attempt ID"),
  responses: z.array(questionResponseSchema)
})

// Schema for category progression
export const categoryProgressionSchema = z.object({
  currentCategoryId: z.string().cuid("Invalid current category ID"),
  nextCategoryId: z.string().cuid("Invalid next category ID").nullable(),
  attemptId: z.string().cuid("Invalid attempt ID"),
  isLastCategory: z.boolean()
})

// Enhanced category completion schema
export const categoryCompletionSchema = z.object({
  categoryId: z.string().cuid("Invalid category ID"),
  isCompleted: z.boolean(),
  nextCategoryId: z.string().cuid("Invalid next category ID").nullable(),
  answeredQuestions: z.number().int().min(0),
  totalQuestions: z.number().int().min(0),
  completionProgress: z.number().min(0).max(100)
})

// Schema for category transition
export const categoryTransitionSchema = z.object({
  fromCategoryId: z.string().cuid("Invalid source category ID"),
  toCategoryId: z.string().cuid("Invalid destination category ID"),
  attemptId: z.string().cuid("Invalid attempt ID"),
  isFromCategoryCompleted: z.boolean(),
  transitionTimestamp: z.date()
})

export type QuestionResponseInput = z.infer<typeof questionResponseSchema>
export type StartTestAttemptInput = z.infer<typeof startTestAttemptSchema>
export type SubmitTestResponsesInput = z.infer<typeof submitTestResponsesSchema>

// Export new types
export type CategoryProgression = z.infer<typeof categoryProgressionSchema>
export type CategoryCompletion = z.infer<typeof categoryCompletionSchema>
export type CategoryTransition = z.infer<typeof categoryTransitionSchema>

// Response types for the new schemas
export interface CategoryProgressionResponse {
  success: boolean
  nextCategoryId: string | null
  error?: string
}

export interface CategoryCompletionResponse {
  success: boolean
  isCompleted: boolean
  nextCategoryId: string | null
  progress: {
    answeredQuestions: number
    totalQuestions: number
    percentage: number
  }
  error?: string
}

export interface CategoryTransitionResponse {
  success: boolean
  fromCategory: {
    id: string
    name: string
    isCompleted: boolean
  }
  toCategory: {
    id: string
    name: string
  }
  error?: string
}