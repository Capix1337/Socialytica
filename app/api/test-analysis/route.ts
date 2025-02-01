// app/api/test-analysis/route.ts

import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { generateTestAnalysis } from "@/lib/services/ai-service";
import type { TestAnalysisResponse } from "@/types/tests/test-analysis";
import { generateAnalysisSchema } from "@/lib/validations/test-analysis";
import { verifyTestAccess } from "@/lib/permissions/test-access";

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

    const { testAttemptId, userProfile, testResults } = validation.data;

    const hasAccess = await verifyTestAccess(clerkUserId, testAttemptId);
    if (!hasAccess) {
      return NextResponse.json({ 
        success: false,
        error: "Forbidden" 
      }, { status: 403 });
    }

    // Check for existing analysis
    const existingAnalysis = await prisma.testAnalysis.findUnique({
      where: { testAttemptId }
    });

    if (existingAnalysis?.isGenerated) {
      return NextResponse.json({
        success: true,
        data: {
          analysis: existingAnalysis.analysis,
          advice: existingAnalysis.advice,
          metadata: existingAnalysis.metadata as Record<string, unknown>
        }
      });
    }

    // Generate analysis using the service
    const aiResponse = await generateTestAnalysis({
      userProfile,
      testResults
    });

    // Save the generated analysis
    const analysis = await prisma.testAnalysis.upsert({
      where: { testAttemptId },
      create: {
        testAttemptId,
        analysis: aiResponse.analysis,
        advice: aiResponse.advice,
        isGenerated: true,
        metadata: {
          userProfile,
          testResults,
          generatedAt: new Date()
        }
      },
      update: {
        analysis: aiResponse.analysis,
        advice: aiResponse.advice,
        isGenerated: true,
        metadata: {
          userProfile,
          testResults,
          generatedAt: new Date()
        }
      }
    });

    return NextResponse.json({
      success: true,
      data: {
        analysis: analysis.analysis,
        advice: analysis.advice,
        metadata: analysis.metadata as Record<string, unknown>
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