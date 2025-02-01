
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
