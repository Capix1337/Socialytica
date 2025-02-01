// lib/validations/test.ts
import { z } from "zod";

export const generateAnalysisSchema = z.object({
  testAttemptId: z.string(),
  userProfile: z.object({
    dateOfBirth: z.string().nullable(),
    gender: z.string().nullable(),
    relationshipStatus: z.string().nullable(),
    countryOfOrigin: z.string().nullable()
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

export type GenerateAnalysisInput = z.infer<typeof generateAnalysisSchema>;