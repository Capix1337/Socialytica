// app/api/(test-taking)/tests/guest/attempt/[attemptId]/complete/route.ts
import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { guestCompletionSchema } from "@/lib/validations/guest-attempt"
import type { GuestCompletionResponse } from "@/types/tests/guest-attempt"

export async function POST(req: Request): Promise<NextResponse<GuestCompletionResponse>> {
  try {
    // 1. Get attempt ID from URL
    const attemptId = req.url.split('/attempt/')[1].split('/complete')[0]
    
    // 2. Validate attempt ID
    const validation = guestCompletionSchema.safeParse({ attemptId })
    if (!validation.success) {
      return NextResponse.json({
        success: false,
        error: "Invalid attempt ID",
        details: validation.error.flatten()
      }, { status: 400 })
    }

    // 3. Process completion in transaction
    const result = await prisma.$transaction(async (tx) => {
      // Get attempt with all related data
      const attempt = await tx.guestAttempt.findFirst({
        where: {
          id: attemptId,
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
              guestAttemptId: attemptId,
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
        where: { id: attemptId },
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

    const response: GuestCompletionResponse = {
      success: true,
      result: {
        attemptId: result.attemptId,
        totalScore: result.totalScore,
        percentageScore: result.percentageScore,
        categoryScores: result.categoryScores.map(cs => ({
          categoryId: cs.categoryId,
          rawScore: cs.rawScore,
          maxRawScore: cs.maxRawScore,
          scaledScore: cs.scaledScore,
          maxScale: cs.maxScale
        }))
      }
    }

    return NextResponse.json(response)

  } catch (error) {
    console.error("[GUEST_COMPLETION]", error)
    
    const errorResponse: GuestCompletionResponse = {
      success: false,
      error: error instanceof Error ? error.message : "Internal server error"
    }
    
    return NextResponse.json(errorResponse, { 
      status: error instanceof Error ? 400 : 500 
    })
  }
}