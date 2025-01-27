// app/api/(test-taking)/tests/attempts/route.ts

import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import type { TestAttemptsResponse } from "@/types/tests/test-attempt"

export async function GET(): Promise<NextResponse<TestAttemptsResponse>> {
  try {
    const { userId: clerkUserId } = await auth()
    if (!clerkUserId) {
      // Return empty response structure for unauthorized
      return NextResponse.json({
        inProgress: [],
        completed: [],
        totalInProgress: 0,
        totalCompleted: 0
      }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { clerkUserId },
      select: { id: true }
    })

    if (!user) {
      // Return empty response structure for missing user
      return NextResponse.json({
        inProgress: [],
        completed: [],
        totalInProgress: 0,
        totalCompleted: 0
      }, { status: 404 })
    }

    // Enhanced query to include all needed data
    const attempts = await prisma.testAttempt.findMany({
      where: {
        userId: user.id
      },
      include: {
        test: {
          select: {
            id: true,
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
            id: true,
            questionId: true,
            selectedOptionId: true
          }
        }
      },
      orderBy: {
        startedAt: 'desc'
      }
    })

    // Transform data to include progress information
    const formattedAttempts = attempts.map(attempt => ({
      id: attempt.id,
      testId: attempt.test.id,
      testTitle: attempt.test.title,
      startedAt: attempt.startedAt,
      status: attempt.status,
      progress: {
        answeredQuestions: attempt.responses.length,
        totalQuestions: attempt.test.questions.length,
        percentageComplete: Math.round(
          (attempt.responses.length / attempt.test.questions.length) * 100
        )
      },
      ...(attempt.status === 'COMPLETED' && {
        score: {
          totalScore: attempt.totalScore,
          percentageScore: attempt.percentageScore
        }
      })
    }))

    // Split attempts by status
    const inProgress = formattedAttempts.filter(a => a.status === "IN_PROGRESS")
    const completed = formattedAttempts
      .filter(a => a.status === "COMPLETED")
      .slice(0, 5) // Limit completed tests to 5

    const response: TestAttemptsResponse = {
      inProgress,
      completed,
      totalInProgress: inProgress.length,
      totalCompleted: completed.length
    }

    return NextResponse.json(response)

  } catch (error) {
    console.error("[TEST_ATTEMPTS_GET]", error)
    // Return empty response structure for errors
    return NextResponse.json({
      inProgress: [],
      completed: [],
      totalInProgress: 0,
      totalCompleted: 0
    }, { status: 500 })
  }
}