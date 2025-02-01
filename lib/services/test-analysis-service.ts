// lib/services/test-analysis-service.ts
import prisma from '@/lib/prisma';
import { generateTestAnalysis } from '@/lib/services/ai-service';
import type { 
  TestAnalysis,
  UserProfileForAnalysis, 
  TestResults,
  TestAnalysisResponse,
  GenerateAnalysisInput 
} from '@/types/test-analysis';

export class TestAnalysisService {
  async getAnalysis(testAttemptId: string): Promise<TestAnalysis | null> {
    return await prisma.testAnalysis.findUnique({
      where: { testAttemptId }
    });
  }

  async createInitialAnalysis(
    testAttemptId: string,
    userProfile: UserProfileForAnalysis,
    testResults: TestResults
  ): Promise<TestAnalysis> {
    const metadata = {
      userProfile,
      testResults,
      generatedAt: new Date().toISOString()
    };

    return await prisma.testAnalysis.create({
      data: {
        testAttemptId,
        analysis: "Generating analysis...",
        advice: "Generating advice...",
        isGenerated: false,
        metadata
      }
    });
  }

  async generateAndUpdateAnalysis(
    testAttemptId: string,
    userProfile: UserProfileForAnalysis,
    testResults: TestResults
  ): Promise<TestAnalysis> {
    // Generate AI analysis
    const aiResponse = await generateTestAnalysis({
      userProfile,
      testResults
    });

    // Update analysis with AI response
    return await prisma.testAnalysis.update({
      where: { testAttemptId },
      data: {
        analysis: aiResponse.analysis,
        advice: aiResponse.advice,
        isGenerated: true
      }
    });
  }

  formatResponse(analysis: TestAnalysis): TestAnalysisResponse {
    return {
      success: true,
      data: {
        analysis: analysis.analysis,
        advice: analysis.advice,
        metadata: analysis.metadata as Record<string, unknown>
      }
    };
  }

  async ensureAnalysisExists(
    input: GenerateAnalysisInput
  ): Promise<TestAnalysis> {
    const { testAttemptId, userProfile, testResults } = input;

    const existingAnalysis = await this.getAnalysis(testAttemptId);
    if (existingAnalysis?.isGenerated) {
      return existingAnalysis;
    }

    // Either create new or update existing unfinished analysis
    const metadata = {
      userProfile: {
        dateOfBirth: userProfile.dateOfBirth,
        gender: userProfile.gender,
        relationshipStatus: userProfile.relationshipStatus,
        countryOfOrigin: userProfile.countryOfOrigin
      },
      testResults: {
        totalScore: testResults.totalScore,
        percentageScore: testResults.percentageScore,
        categoryScores: testResults.categoryScores
      },
      generatedAt: new Date().toISOString()
    };

    return await prisma.testAnalysis.upsert({
      where: { testAttemptId },
      create: {
        testAttemptId,
        analysis: "Generating analysis...",
        advice: "Generating advice...",
        isGenerated: false,
        metadata
      },
      update: {
        metadata
      }
    });
  }
}