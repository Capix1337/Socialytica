import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { guestCompletionSchema } from "@/lib/validations/guest-attempt"
import type { GuestCompletionResponse } from "@/types/tests/guest-attempt"

export async function POST(
  req: Request,
  { params }: { params: { attemptId: string } }
): Promise<NextResponse<GuestCompletionResponse>> {
  try {
    const validation = guestCompletionSchema.safeParse({
      attemptId: params.attemptId
    })

    if (!validation.success) {
      return NextResponse.json({
        success: false,
        error: "Invalid attempt ID",
        details: validation.error.flatten()
      }, { status: 400 })
    }

    const result = await prisma.$transaction(async (tx) => {
      // Get attempt with all related data
      const attempt = await tx.guestAttempt.findFirst({
        where: {
          id: params.attemptId,
          status: "IN_PROGRESS",
          expiresAt: {
            gt: new Date()
          }
        },
        include: {
          test: {
            include: {
              categories: {
                include: {
                  questions: {
                    include: {
                      options: true
                    }
                  }
                }
              }
            }
          },
          responses: true
        }
      })

      if (!attempt) {
        throw new Error("Guest attempt not found, expired, or not in progress")
      }

      // Calculate category scores
      const categoryScores = await Promise.all(
        attempt.test.categories.map(async (category) => {
          const categoryQuestions = category.questions
          let rawScore = 0
          let maxRawScore = 0

          categoryQuestions.forEach(question => {
            const response = attempt.responses.find(r => r.questionId === question.id)
            if (response) {
              rawScore += response.pointsEarned
            }
            maxRawScore += Math.max(...question.options.map(opt => opt.point))
          })

          const scaledScore = (rawScore / maxRawScore) * category.scale

          return await tx.guestCategoryScore.create({
            data: {
              guestAttemptId: params.attemptId,
              categoryId: category.id,
              rawScore,
              maxRawScore,
              actualScore: scaledScore,
              maxScale: category.scale
            }
          })
        })
      )

      // Calculate total scores
      const totalScore = categoryScores.reduce((sum, cs) => sum + cs.actualScore, 0)
      const maxPossibleScore = categoryScores.reduce((sum, cs) => sum + cs.maxScale, 0)
      const percentageScore = (totalScore / maxPossibleScore) * 100

      // Update attempt status
      const updatedAttempt = await tx.guestAttempt.update({
        where: { id: params.attemptId },
        data: {
          status: "COMPLETED",
          completedAt: new Date(),
          totalScore,
          percentageScore
        }
      })

      return {
        attemptId: updatedAttempt.id,
        totalScore,
        percentageScore,
        categoryScores: categoryScores.map(cs => ({
          categoryId: cs.categoryId,
          rawScore: cs.rawScore,
          maxRawScore: cs.maxRawScore,
          scaledScore: cs.actualScore,
          maxScale: cs.maxScale
        }))
      }
    })

    return NextResponse.json({
      success: true,
      result: result
    })

  } catch (error) {
    console.error("[GUEST_COMPLETION]", error)
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Internal server error"
    }, { status: error instanceof Error ? 400 : 500 })
  }
}