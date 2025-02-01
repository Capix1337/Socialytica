// app/api/test-analysis/route.ts
import { TestAnalysisService } from '@/lib/services/test-analysis-service';
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { generateAnalysisSchema } from '@/lib/validations/test';
import { verifyTestAccess } from '@/lib/auth/verify-access';
import type { TestAnalysisResponse, GenerateAnalysisInput } from '@/types/test-analysis';

const analysisService = new TestAnalysisService();

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

    const analysis = await analysisService.getAnalysis(attemptId);
    if (!analysis) {
      return NextResponse.json({ 
        success: false,
        error: "Analysis not found" 
      }, { status: 404 });
    }

    return NextResponse.json(analysisService.formatResponse(analysis));

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

    const input = validation.data as GenerateAnalysisInput;
    
    // Check access before proceeding
    const hasAccess = await verifyTestAccess(clerkUserId, input.testAttemptId);
    if (!hasAccess) {
      return NextResponse.json({ 
        success: false,
        error: "Forbidden" 
      }, { status: 403 });
    }

    // Get or create initial analysis record
    const initialAnalysis = await analysisService.ensureAnalysisExists(input);
    
    // If analysis is already generated, return existing
    if (initialAnalysis.isGenerated) {
      return NextResponse.json(analysisService.formatResponse(initialAnalysis));
    }
    
    // Generate and update with AI analysis
    const updatedAnalysis = await analysisService.generateAndUpdateAnalysis(
      input.testAttemptId,
      input.userProfile,
      input.testResults
    );

    return NextResponse.json(analysisService.formatResponse(updatedAnalysis));

  } catch (error) {
    console.error("[TEST_ANALYSIS_POST]", error);
    return NextResponse.json({ 
      success: false,
      error: "Internal server error" 
    }, { status: 500 });
  }
}