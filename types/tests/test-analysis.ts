import { z } from "zod";

export interface TestAnalysis {
    id: string;
    testAttemptId: string;
    analysis: string;
    advice: string;
    isGenerated: boolean;
    metadata?: Record<string, unknown>;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface TestAnalysisResponse {
    success: boolean;
    data?: {
      analysis: string;
      advice: string;
      metadata?: Record<string, unknown>;
    };
    error?: string;
  }
  
  export interface GenerateAnalysisInput {
    testAttemptId: string;
    userProfile: {
      gender?: string;
      dateOfBirth?: string;
      relationshipStatus?: string;
      countryOfOrigin?: string;
    };
    testResults: {
      totalScore: number;
      percentageScore: number;
      categoryScores: Array<{
        category: {
          name: string;
          description: string | null;
        };
        scaledScore: number;
        maxScale: number;
        percentage: number;
      }>;
    };
  }

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