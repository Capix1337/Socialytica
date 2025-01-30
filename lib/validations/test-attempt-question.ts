// lib/validations/test-attempt-question.ts

import { z } from "zod"

export const testAttemptQuestionsQuerySchema = z.object({
  attemptId: z.string()
})

export const updateQuestionResponseSchema = z.object({
  questionId: z.string().cuid("Invalid question ID"),
  selectedOptionId: z.string().cuid("Invalid option ID")
})

export const submitAnswerSchema = z.object({
  questionId: z.string(),
  selectedOptionId: z.string()
})

// Add the missing batch schema
export const submitBatchAnswersSchema = z.object({
  answers: z.array(
    z.object({
      questionId: z.string(),
      selectedOptionId: z.string(),
      timestamp: z.number()
    })
  )
})

export type TestAttemptQuestionsQuery = z.infer<typeof testAttemptQuestionsQuerySchema>
export type UpdateQuestionResponseInput = z.infer<typeof updateQuestionResponseSchema>
export type SubmitAnswerInput = z.infer<typeof submitAnswerSchema>