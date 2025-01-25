import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { guestMigrationSchema } from "@/lib/validations/guest-attempt"
import type { GuestMigrationResponse } from "@/types/tests/guest-attempt"

export async function POST(request: Request): Promise<NextResponse<GuestMigrationResponse>> {
  try {
    // Get authenticated user
    const { userId: clerkUserId } = await auth()
    if (!clerkUserId) {
      return NextResponse.json({ 
        success: false,
        error: "Unauthorized" 
      }, { status: 401 })
    }

    // Validate request
    const validation = guestMigrationSchema.safeParse(await request.json())
    if (!validation.success) {
      return NextResponse.json({
        success: false,
        error: "Invalid request data",
        details: validation.error.flatten()
      }, { status: 400 })
    }

    // Get user
    const user = await prisma.user.findUnique({
      where: { clerkUserId },
      select: { id: true }
    })

    if (!user) {
      return NextResponse.json({
        success: false,
        error: "User not found"
      }, { status: 404 })
    }

    // Migrate guest attempts in transaction
    const result = await prisma.$transaction(async (tx) => {
      const { guestId } = validation.data

      // Get all guest attempts
      const guestAttempts = await tx.guestAttempt.findMany({
        where: {
          guestId,
          expiresAt: {
            gt: new Date()
          }
        },
        include: {
          responses: true,
          categoryScores: true
        }
      })

      // Migrate each attempt
      const migratedAttempts = await Promise.all(
        guestAttempts.map(async (guestAttempt) => {
          // Create new test attempt
          const testAttempt = await tx.testAttempt.create({
            data: {
              testId: guestAttempt.testId,
              userId: user.id,
              status: guestAttempt.status,
              startedAt: guestAttempt.startedAt,
              completedAt: guestAttempt.completedAt,
              totalScore: guestAttempt.totalScore,
              percentageScore: guestAttempt.percentageScore
            }
          })

          // Migrate responses
          await tx.questionResponse.createMany({
            data: guestAttempt.responses.map(response => ({
              testAttemptId: testAttempt.id,
              questionId: response.questionId,
              selectedOptionId: response.selectedOptionId,
              pointsEarned: response.pointsEarned,
              maxPoints: response.maxPoints
            }))
          })

          // Migrate category scores
          await tx.categoryScore.createMany({
            data: guestAttempt.categoryScores.map(score => ({
              testAttemptId: testAttempt.id,
              categoryId: score.categoryId,
              rawScore: score.rawScore,
              maxRawScore: score.maxRawScore,
              actualScore: score.actualScore,
              maxScale: score.maxScale
            }))
          })

          // Delete guest attempt
          await tx.guestAttempt.delete({
            where: { id: guestAttempt.id }
          })

          return testAttempt.id
        })
      )

      return migratedAttempts
    })

    return NextResponse.json({
      success: true,
      migratedAttemptIds: result
    })

  } catch (error) {
    console.error("[GUEST_MIGRATION]", error)
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Internal server error"
    }, { status: error instanceof Error ? 400 : 500 })
  }
}