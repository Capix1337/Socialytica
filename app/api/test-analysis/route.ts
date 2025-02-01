// app/api/test-analysis/route.ts

import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { generateTestAnalysis } from "@/lib/services/ai-service";
import type { TestAnalysisResponse } from "@/types/tests/test-analysis";
import { generateAnalysisSchema } from "@/lib/validations/test-analysis";
import { verifyTestAccess } from "@/lib/permissions/test-access";
import { type GenerateAnalysisInput, UserProfileForAnalysis } from '@/types/test-analysis';

// GET - Retrieve existing analysis
export async function GET(
  req: Request
): Promise<NextResponse<TestAnalysisResponse>> {
  try {
    const { searchParams } = new URL(req.url);
    const attemptId = searchParams.get("attemptId");

    if (!attemptId) {
      return NextResponse.json({ 
        success: false,
        error: "Missing attempt ID" 
      }, { status: 400 });
    }

    const { userId: clerkUserId } = await auth();
    if (!clerkUserId) {
      return NextResponse.json({ 
        success: false,
        error: "Unauthorized" 
      }, { status: 401 });
    }

    const hasAccess = await verifyTestAccess(clerkUserId, attemptId);
    if (!hasAccess) {
      return NextResponse.json({ 
        success: false,
        error: "Forbidden" 
      }, { status: 403 });
    }

    const analysis = await prisma.testAnalysis.findUnique({
      where: { testAttemptId: attemptId }
    });

    if (!analysis) {
      return NextResponse.json({ 
        success: false,
        error: "Analysis not found" 
      }, { status: 404 });
    }

    // Cast metadata to correct type
    return NextResponse.json({
      success: true,
      data: {
        analysis: analysis.analysis,
        advice: analysis.advice,
        metadata: analysis.metadata as Record<string, unknown>
      }
    });

  } catch (error) {
    console.error("[TEST_ANALYSIS_GET]", error);
    return NextResponse.json({ 
      success: false,
      error: "Internal server error" 
    }, { status: 500 });
  }
}

// POST - Generate new analysis
export async function POST(
  req: Request
): Promise<NextResponse<TestAnalysisResponse>> {
  try {
    const { userId: clerkUserId } = await auth();
    if (!clerkUserId) {
      return NextResponse.json({ 
        success: false,
        error: "Unauthorized" 
      }, { status: 401 });
    }

    const body = await req.json();
    const validation = generateAnalysisSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ 
        success: false,
        error: "Invalid request data",
        details: validation.error.flatten()
      }, { status: 400 });
    }

    const { testAttemptId, userProfile, testResults } = validation.data as GenerateAnalysisInput;

    const hasAccess = await verifyTestAccess(clerkUserId, testAttemptId);
    if (!hasAccess) {
      return NextResponse.json({ 
        success: false,
        error: "Forbidden" 
      }, { status: 403 });
    }

    const metadata = {
      userProfile: {
        dateOfBirth: userProfile.dateOfBirth || null,
        gender: userProfile.gender || null,
        relationshipStatus: userProfile.relationshipStatus || null,
        countryOfOrigin: userProfile.countryOfOrigin || null
      } as Record<string, string | null>,
      testResults: {
        totalScore: testResults.totalScore,
        percentageScore: testResults.percentageScore,
        categoryScores: testResults.categoryScores.map(score => ({
          ...score,
          category: {
            name: score.category.name,
            description: score.category.description || null
          }
        }))
      },
      generatedAt: new Date().toISOString()
    } as const;

    const analysis = await prisma.testAnalysis.upsert({
      where: { testAttemptId },
      create: {
        testAttemptId,
        analysis: "Generating analysis...",
        advice: "Generating advice...",
        isGenerated: false,
        metadata
      },
      update: {
        analysis: "Generating analysis...",
        advice: "Generating advice...",
        isGenerated: false,
        metadata
      }
    });

    const userProfileForAnalysis: UserProfileForAnalysis = {
      dateOfBirth: userProfile.dateOfBirth,
      gender: userProfile.gender,
      relationshipStatus: userProfile.relationshipStatus,
      countryOfOrigin: userProfile.countryOfOrigin
    };

    // Generate AI analysis with properly typed data
    const aiResponse = await generateTestAnalysis({ 
      userProfile: userProfileForAnalysis,
      testResults 
    });

    // Update with AI response
    const updatedAnalysis = await prisma.testAnalysis.update({
      where: { id: analysis.id },
      data: {
        analysis: aiResponse.analysis,
        advice: aiResponse.advice,
        isGenerated: true
      }
    });

    // Cast metadata to correct type
    return NextResponse.json({
      success: true,
      data: {
        analysis: updatedAnalysis.analysis,
        advice: updatedAnalysis.advice,
        metadata: updatedAnalysis.metadata as Record<string, unknown>
      }
    });

  } catch (error) {
    console.error("[TEST_ANALYSIS_POST]", error);
    return NextResponse.json({ 
      success: false,
      error: "Internal server error" 
    }, { status: 500 });
  }
}