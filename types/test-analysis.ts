// types/test-analysis.ts

export interface UserProfile {
  gender?: string;
  dateOfBirth?: string;
  relationshipStatus?: string;
  countryOfOrigin?: string;
}

export interface CategoryScore {
  category: {
    name: string;
    description?: string;
  };
  percentage: number;
  scaledScore: number;
  maxScale: number;
}

export interface TestResults {
  percentageScore: number;
  categoryScores: CategoryScore[];
}

export interface AIResponse {
  analysis: string;
  advice: string;
}

export interface GenerateAnalysisInput {
  userProfile: UserProfile;
  testResults: TestResults;
  testAttemptId: string;
}