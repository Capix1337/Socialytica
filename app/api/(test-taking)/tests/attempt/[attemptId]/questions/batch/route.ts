import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { submitBatchAnswersSchema } from "@/lib/validations/test-attempt-question"
import type { BatchAnswerResponse } from "@/types/tests/test-attempt-question"

export async function PATCH(req: Request) {
  try {
    // 1. Auth check
    const { userId: clerkUserId } = await auth()
    if (!clerkUserId) {
      return NextResponse.json({ 
        success: false, 
        error: "Unauthorized" 
      }, { status: 401 })
    }

    // 2. Get attempt ID and validate payload
    const attemptId = req.url.split('/attempt/')[1].split('/')[0]
    const body = await req.json()
    
    const validation = submitBatchAnswersSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json({
        success: false,
        error: "Invalid request data",
        details: validation.error.flatten()
      }, { status: 400 })
    }

    const { answers } = validation.data

    // 3. Process batch update
    const result = await prisma.$transaction(async (prismaClient) => {
      const results = await Promise.all(
        answers.map(async ({ questionId, selectedOptionId }) => {
          try {
            const question = await prismaClient.question.findFirst({
              where: { id: questionId },
              include: { options: true }
            })

            if (!question) {
              return { 
                questionId, 
                success: false, 
                error: "Question not found" 
              }
            }

            const selectedOption = question.options.find(
              opt => opt.id === selectedOptionId
            )

            if (!selectedOption) {
              return { 
                questionId, 
                success: false, 
                error: "Selected option not found" 
              }
            }

            const maxPoints = Math.max(...question.options.map(opt => opt.point))
            const pointsEarned = selectedOption.point

            await prismaClient.questionResponse.upsert({
              where: {
                testAttemptId_questionId: {
                  testAttemptId: attemptId,
                  questionId
                }
              },
              create: {
                testAttemptId: attemptId,
                questionId,
                selectedOptionId,
                pointsEarned,
                maxPoints
              },
              update: {
                selectedOptionId,
                pointsEarned,
                maxPoints
              }
            })

            return { questionId, success: true }
          } catch (error) {
            console.error(`Failed to save answer for question ${questionId}:`, error)
            return { 
              questionId, 
              success: false, 
              error: 'Failed to save answer' 
            }
          }
        })
      )

      const batchResponse: BatchAnswerResponse = {
        success: true,
        results
      }

      return batchResponse
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error('Batch update failed:', error)
    
    const errorResponse: BatchAnswerResponse = {
      success: false,
      error: error instanceof Error ? error.message : 'Internal server error',
      results: []
    }
    
    return NextResponse.json(errorResponse, { status: 500 })
  }
}