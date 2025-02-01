import { z } from "zod";

export const generateAnalysisSchema = z.object({
  testAttemptId: z.string().cuid("Invalid test attempt ID"),
  userProfile: z.object({
    gender: z.string().optional(),
    dateOfBirth: z.string().optional(),
    relationshipStatus: z.string().optional(),
    countryOfOrigin: z.string().optional()
  }),
  testResults: z.object({
    totalScore: z.number(),
    percentageScore: z.number(),
    categoryScores: z.array(z.object({
      category: z.object({
        name: z.string(),
        description: z.string().nullable()
      }),
      scaledScore: z.number(),
      maxScale: z.number(),
      percentage: z.number()
    }))
  })
});