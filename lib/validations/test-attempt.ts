//lib/validation/test-attempt.ts
import * as z from "zod"
import { z } from "zod"

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

// Add new schema for category completion
export const categoryCompletionSchema = z.object({
  categoryId: z.string().cuid("Invalid category ID"),
  isCompleted: z.boolean(),
  nextCategoryId: z.string().cuid("Invalid next category ID").nullable()
})

export type QuestionResponseInput = z.infer<typeof questionResponseSchema>
export type StartTestAttemptInput = z.infer<typeof startTestAttemptSchema>
export type SubmitTestResponsesInput = z.infer<typeof submitTestResponsesSchema>

// Add type for category completion response
export type CategoryCompletionResponse = {
  success: boolean
  nextCategoryId: string | null
}