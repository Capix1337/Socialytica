// lib/services/test-analysis-service.ts
import prisma from '@/lib/prisma';
import { generateTestAnalysis } from '@/lib/services/ai-service';
import type { 
  TestAnalysis,
  TestAnalysisMetadata,
  UserProfileForAnalysis, 
  TestResults,
  TestAnalysisResponse,
  GenerateAnalysisInput,
  AnalysisError
} from '@/types/test-analysis';
import { Prisma } from '@prisma/client';

export class TestAnalysisService {
  private serializeMetadata(metadata: TestAnalysisMetadata): Prisma.JsonObject {
    // Convert the metadata to a plain object that's JSON-serializable
    return {
      userProfile: {
        dateOfBirth: metadata.userProfile.dateOfBirth,
        gender: metadata.userProfile.gender,
        relationshipStatus: metadata.userProfile.relationshipStatus,
        countryOfOrigin: metadata.userProfile.countryOfOrigin
      },
      testResults: {
        totalScore: metadata.testResults.totalScore,
        percentageScore: metadata.testResults.percentageScore,
        categoryScores: metadata.testResults.categoryScores.map(score => ({
          category: {
            name: score.category.name,
            description: score.category.description
          },
          scaledScore: score.scaledScore,
          maxScale: score.maxScale,
          percentage: score.percentage
        }))
      },
      generatedAt: metadata.generatedAt
    } as Prisma.JsonObject;
  }

  private validateMetadata(rawMetadata: unknown): TestAnalysisMetadata {
    if (!rawMetadata || typeof rawMetadata !== 'object') {
      throw new Error('Invalid metadata structure');
    }

    const metadata = rawMetadata as Record<string, unknown>;
    
    if (!metadata.userProfile || !metadata.testResults || !metadata.generatedAt) {
      throw new Error('Missing required metadata fields');
    }

    return {
      userProfile: metadata.userProfile as UserProfileForAnalysis,
      testResults: metadata.testResults as TestResults,
      generatedAt: String(metadata.generatedAt)
    };
  }

  async getAnalysis(testAttemptId: string): Promise<TestAnalysis | null> {
    const analysis = await prisma.testAnalysis.findUnique({
      where: { testAttemptId }
    });

    if (!analysis) return null;

    try {
      const validatedMetadata = this.validateMetadata(analysis.metadata);
      
      return {
        ...analysis,
        metadata: validatedMetadata
      };
    } catch (error) {
      console.error('Error validating metadata:', error);
      return null;
    }
  }

  async createInitialAnalysis(
    testAttemptId: string,
    userProfile: UserProfileForAnalysis,
    testResults: TestResults
  ): Promise<TestAnalysis> {
    const metadata: TestAnalysisMetadata = {
      userProfile,
      testResults,
      generatedAt: new Date().toISOString()
    };

    const analysis = await prisma.testAnalysis.create({
      data: {
        testAttemptId,
        analysis: "Generating analysis...",
        advice: "Generating advice...",
        isGenerated: false,
        metadata: this.serializeMetadata(metadata)
      }
    });

    return {
      ...analysis,
      metadata
    };
  }

  async generateAndUpdateAnalysis(
    testAttemptId: string,
    userProfile: UserProfileForAnalysis,
    testResults: TestResults
  ): Promise<TestAnalysis> {
    try {
      // Generate AI analysis
      const aiResponse = await generateTestAnalysis({
        userProfile,
        testResults
      });

      const metadata: TestAnalysisMetadata = {
        userProfile,
        testResults,
        generatedAt: new Date().toISOString()
      };

      // Update analysis with AI response
      const analysis = await prisma.testAnalysis.update({
        where: { testAttemptId },
        data: {
          analysis: aiResponse.analysis,
          advice: aiResponse.advice,
          isGenerated: true,
          metadata: this.serializeMetadata(metadata)
        }
      });

      return {
        ...analysis,
        metadata: this.validateMetadata(analysis.metadata)
      };
    } catch (error) {
      // Update the record to show generation failed and include it in the error
      const failedAnalysis = await prisma.testAnalysis.update({
        where: { testAttemptId },
        data: {
          analysis: "Analysis generation failed. Please try again.",
          advice: "Advice generation failed. Please try again.",
          isGenerated: false
        }
      });

      // Create custom error with the failed analysis state
      const enhancedError = new Error(
        error instanceof Error ? error.message : 'Failed to generate test analysis'
      ) as AnalysisError;
      
      enhancedError.failedAnalysis = failedAnalysis;
      throw enhancedError;
    }
  }

  formatResponse(analysis: TestAnalysis): TestAnalysisResponse {
    return {
      success: true,
      data: {
        analysis: analysis.analysis,
        advice: analysis.advice,
        metadata: this.serializeMetadata(analysis.metadata),
        isGenerated: analysis.isGenerated // Include this field
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
    const metadata: TestAnalysisMetadata = {
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

    const analysis = await prisma.testAnalysis.upsert({
      where: { testAttemptId },
      create: {
        testAttemptId,
        analysis: "Generating analysis...",
        advice: "Generating advice...",
        isGenerated: false,
        metadata: this.serializeMetadata(metadata)
      },
      update: {
        metadata: this.serializeMetadata(metadata)
      }
    });

    // Validate the metadata before returning
    return {
      ...analysis,
      metadata: this.validateMetadata(analysis.metadata)
    };
  }
}