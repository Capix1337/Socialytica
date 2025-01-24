import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { guestAttemptsQuerySchema } from "@/lib/validations/guest-attempt"
import type { GuestAttemptsResponse } from "@/types/tests/guest-attempt"

export async function GET(request: Request): Promise<NextResponse<GuestAttemptsResponse | { error: string }>> {
  try {
    // 1. Extract guestId from query params
    const { searchParams } = new URL(request.url)
    const validation = guestAttemptsQuerySchema.safeParse({
      guestId: searchParams.get('guestId')
    })

    if (!validation.success) {
      return NextResponse.json({
        error: "Invalid guest ID",
        details: validation.error.flatten()
      }, { status: 400 })
    }

    const { guestId } = validation.data

    // 2. Query attempts from database
    const attempts = await prisma.guestAttempt.findMany({
      where: {
        guestId,
        expiresAt: {
          gt: new Date() // Only return non-expired attempts
        }
      },
      include: {
        test: {
          select: {
            title: true,
            questions: {
              select: {
                id: true
              }
            }
          }
        },
        responses: {
          select: {
            id: true
          }
        },
        categoryScores: {
          include: {
            category: true
          }
        }
      },
      orderBy: {
        startedAt: 'desc'
      }
    })

    // 3. Separate and format attempts
    const inProgress = attempts
      .filter(attempt => attempt.status === "IN_PROGRESS")
      .map(attempt => ({
        id: attempt.id,
        testId: attempt.testId,
        testTitle: attempt.test.title,
        startedAt: attempt.startedAt.getTime(),
        status: attempt.status,
        progress: {
          answeredQuestions: attempt.responses.length,
          totalQuestions: attempt.test.questions.length,
          percentageComplete: Math.round(
            (attempt.responses.length / attempt.test.questions.length) * 100
          )
        }
      }))

    const completed = attempts
      .filter(attempt => attempt.status === "COMPLETED")
      .slice(0, 3) // Limit to 3 most recent
      .map(attempt => ({
        id: attempt.id,
        testId: attempt.testId,
        testTitle: attempt.test.title,
        startedAt: attempt.startedAt.getTime(),
        status: attempt.status,
        progress: {
          answeredQuestions: attempt.test.questions.length,
          totalQuestions: attempt.test.questions.length,
          percentageComplete: 100
        },
        score: {
          totalScore: attempt.totalScore,
          percentageScore: attempt.percentageScore
        }
      }))

    const response: GuestAttemptsResponse = {
      inProgress,
      completed,
      totalInProgress: inProgress.length,
      totalCompleted: completed.length
    }

    return NextResponse.json(response)

  } catch (error) {
    console.error("[GUEST_ATTEMPTS_GET]", error)
    return NextResponse.json({ 
      error: "Internal server error" 
    }, { status: 500 })
  }
}