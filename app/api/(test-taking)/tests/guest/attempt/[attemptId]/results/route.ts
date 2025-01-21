import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { guestResultsQuerySchema } from "@/lib/validations/guest-attempt"
import type { GuestAttemptResult } from "@/types/tests/guest-attempt"

export async function GET(
  req: Request
): Promise<NextResponse<GuestAttemptResult | { error: string }>> {
  try {
    // Get attemptId from URL
    const attemptId = req.url.split('/attempt/')[1].split('/results')[0]
    
    const validation = guestResultsQuerySchema.safeParse({
      attemptId
    })

    if (!validation.success) {
      return NextResponse.json({
        error: "Invalid attempt ID",
        details: validation.error.flatten()
      }, { status: 400 })
    }

    const attempt = await prisma.guestAttempt.findFirst({
      where: {
        id: attemptId,
        status: "COMPLETED",
        expiresAt: {
          gt: new Date()
        }
      },
      include: {
        test: {
          select: {
            title: true,
            description: true
          }
        },
        responses: {
          include: {
            question: true,
            selectedOption: true
          }
        },
        categoryScores: {
          include: {
            category: true
          }
        }
      }
    })

    if (!attempt) {
      return NextResponse.json({ 
        error: "Guest attempt not found, expired, or not completed" 
      }, { status: 404 })
    }

    // Return blurred results for guest users
    const result: GuestAttemptResult = {
      isBlurred: true,
      needsAuth: true,
      test: {
        name: attempt.test.title
      },
      totalScore: attempt.totalScore,
      maxScore: attempt.categoryScores.reduce((sum, cs) => sum + cs.maxScale, 0),
      percentageScore: attempt.percentageScore,
      categoryScores: attempt.categoryScores.map(cs => ({
        category: cs.category,
        scaledScore: cs.actualScore,
        maxScale: cs.maxScale,
        percentage: (cs.actualScore / cs.maxScale) * 100
      }))
    }

    return NextResponse.json(result)

  } catch (error) {
    console.error("[GUEST_RESULTS_GET]", error)
    return NextResponse.json({ 
      error: "Internal server error" 
    }, { status: 500 })
  }
}
