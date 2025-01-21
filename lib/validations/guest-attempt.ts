import { z } from "zod"

// Schema for starting a guest test attempt
export const startGuestTestAttemptSchema = z.object({
  testId: z.string().uuid("Invalid test ID"),
  guestId: z.string().uuid("Invalid guest ID").optional()
})

// Schema for querying guest attempt
export const guestAttemptQuerySchema = z.object({
  attemptId: z.string().cuid("Invalid attempt ID")
})

// Schema for guest attempt questions
export const guestAttemptQuestionsQuerySchema = z.object({
  attemptId: z.string().cuid("Invalid attempt ID")
})

// Schema for submitting guest answers
export const submitGuestAnswerSchema = z.object({
  attemptId: z.string().cuid("Invalid attempt ID"),
  questionId: z.string().cuid("Invalid question ID"),
  selectedOptionId: z.string().cuid("Invalid option ID")
})

// Schema for completing guest attempt
export const guestCompletionSchema = z.object({
  attemptId: z.string().cuid("Invalid attempt ID")
})

// Schema for getting guest results
export const guestResultsQuerySchema = z.object({
  attemptId: z.string().cuid("Invalid attempt ID")
})

// Schema for migrating guest attempts
export const guestMigrationSchema = z.object({
  guestId: z.string().uuid("Invalid guest ID")
})