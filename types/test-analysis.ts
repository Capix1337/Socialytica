// types/test-analysis.ts

export interface UserProfile {
  id: string;  // Required field
  gender?: string;
  dateOfBirth?: string;
  relationshipStatus?: string;
  countryOfOrigin?: string;
}

export interface UserProfileForAnalysis {
  dateOfBirth?: string | null;
  gender?: string | null;
  relationshipStatus?: string | null;
  countryOfOrigin?: string | null;
}

export interface Category {
  id: string;
  name: string;
  description?: string; // Using undefined instead of null
  testId: string;
  scale: number;
}

export interface CategoryScore {
  category: {
    name: string;
    description?: string;  // Changed from string | null
  };
  scaledScore: number;
  maxScale: number;
  percentage: number;
}

export interface TestResults {
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
}

export interface AIResponse {
  analysis: string;
  advice: string;
}

export interface GenerateAnalysisInput {
  testAttemptId: string;
  userProfile: UserProfileForAnalysis;
  testResults: TestResults;
}

export interface TestAnalysisResponse {
  success: boolean;
  data?: {
    analysis: string;
    advice: string;
    metadata: Record<string, unknown>;
  };
  error?: string;
}

export interface TestAnalysisMetadata {
  userProfile: UserProfileForAnalysis;
  testResults: TestResults;
  generatedAt: string;
}