// app/api/(test-taking)/tests/attempt/[attemptId]/questions/route.ts

import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { 
  testAttemptQuestionsQuerySchema, 
  submitAnswerSchema,
  submitBatchAnswersSchema 
} from "@/lib/validations/test-attempt-question"
import type { 
  TestAttemptQuestionsResponse,
  SubmitAnswerResponse,
  BatchAnswerResponse
} from "@/types/tests/test-attempt-question"

export async function GET(req: Request) {
  try {
    const { userId: clerkUserId } = await auth()
    if (!clerkUserId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const attemptId = req.url.split('/attempt/')[1].split('/')[0]
    const validation = testAttemptQuestionsQuerySchema.safeParse({ attemptId })
    
    if (!validation.success) {
      return NextResponse.json({
        error: "Invalid attempt ID",
        details: validation.error.flatten()
      }, { status: 400 })
    }

    const user = await prisma.user.findUnique({
      where: { clerkUserId },
      select: { id: true }
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const attempt = await prisma.testAttempt.findFirst({
      where: {
        id: attemptId,
        userId: user.id,
        status: "IN_PROGRESS"
      },
      include: {
        test: {
          select: {
            categories: {
              orderBy: { id: 'asc' },
              select: {
                id: true,
                name: true,
                questions: {
                  select: {
                    id: true,
                    title: true,
                    categoryId: true,
                    category: {
                      select: {
                        id: true,
                        name: true
                      }
                    },
                    options: {
                      select: {
                        id: true,
                        text: true,
                        point: true
                      }
                    }
                  }
                }
              }
            }
          }
        },
        responses: {
          select: {
            questionId: true,
            selectedOptionId: true
          }
        }
      }
    })

    if (!attempt) {
      return NextResponse.json({ error: "Test attempt not found" }, { status: 404 })
    }

    const response: TestAttemptQuestionsResponse = {
      questions: attempt.test.categories.flatMap(category => 
        category.questions.map(question => ({
          id: `${attempt.id}_${question.id}`,
          testAttemptId: attempt.id,
          questionId: question.id,
          question: {
            ...question,
            categoryId: question.categoryId,
            category: question.category
          },
          selectedOptionId: attempt.responses.find(r => r.questionId === question.id)?.selectedOptionId ?? null,
          isAnswered: attempt.responses.some(r => r.questionId === question.id),
          createdAt: new Date(),
          updatedAt: new Date()
        }))
      ),
      totalQuestions: attempt.test.categories.reduce((sum, cat) => sum + cat.questions.length, 0),
      answeredQuestions: attempt.responses.length,
      categories: attempt.test.categories.map(cat => ({
        id: cat.id,
        name: cat.name,
        isCompleted: cat.questions.every(q => 
          attempt.responses.some(r => r.questionId === q.id)
        )
      })),
      currentCategoryId: attempt.test.categories[0]?.id || null,
      nextCategoryId: attempt.test.categories.find((cat, index) => 
        index > 0 && !cat.questions.every(q => 
          attempt.responses.some(r => r.questionId === q.id)
        )
      )?.id || null
    }

    return NextResponse.json(response)

  } catch (error) {
    console.error("[TEST_ATTEMPT_QUESTIONS_GET]", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PATCH(req: Request) {
  try {
    const { userId: clerkUserId } = await auth()
    if (!clerkUserId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const attemptId = req.url.split('/attempt/')[1].split('/')[0]
    const json = await req.json()

    // Check if this is a batch update
    const isBatchUpdate = req.url.includes('/batch')
    const validation = isBatchUpdate 
      ? submitBatchAnswersSchema.safeParse(json)
      : submitAnswerSchema.safeParse(json)

    if (!validation.success) {
      return NextResponse.json({
        success: false,
        error: "Invalid request data",
        details: validation.error.flatten()
      }, { status: 400 })
    }

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

    // Process updates in transaction
    const result = await prisma.$transaction(async (tx) => {
      const attempt = await tx.testAttempt.findFirst({
        where: {
          id: attemptId,
          userId: user.id,
          status: "IN_PROGRESS"
        }
      })

      if (!attempt) {
        throw new Error("Test attempt not found or not in progress")
      }

      if (isBatchUpdate) {
        const { answers } = validation.data as { answers: Array<{
          questionId: string
          selectedOptionId: string
          timestamp: number
        }> }

        const results = await Promise.all(
          answers.map(async (answer) => {
            const question = await tx.question.findFirst({
              where: { id: answer.questionId },
              include: { options: true }
            })

            if (!question) {
              return { questionId: answer.questionId, success: false, error: "Question not found" }
            }

            const selectedOption = question.options.find(
              opt => opt.id === answer.selectedOptionId
            )

            if (!selectedOption) {
              return { questionId: answer.questionId, success: false, error: "Selected option not found" }
            }

            const maxPoints = Math.max(...question.options.map(opt => opt.point))
            const pointsEarned = selectedOption.point

            await tx.questionResponse.upsert({
              where: {
                testAttemptId_questionId: {
                  testAttemptId: attemptId,
                  questionId: answer.questionId
                }
              },
              create: {
                testAttemptId: attemptId,
                questionId: answer.questionId,
                selectedOptionId: answer.selectedOptionId,
                pointsEarned,
                maxPoints
              },
              update: {
                selectedOptionId: answer.selectedOptionId,
                pointsEarned,
                maxPoints
              }
            })

            return { questionId: answer.questionId, success: true }
          })
        )

        const batchResponse: BatchAnswerResponse = {
          success: true,
          results: results.map(r => ({
            questionId: r.questionId,
            success: r.success,
            error: r.error
          }))
        }

        return batchResponse
      } else {
        // Handle single update (existing logic)
        const { questionId, selectedOptionId } = validation.data as {
          questionId: string
          selectedOptionId: string
        }

        const question = await tx.question.findFirst({
          where: { id: questionId },
          include: { options: true }
        })

        if (!question) {
          throw new Error("Question not found")
        }

        const selectedOption = question.options.find(
          opt => opt.id === selectedOptionId
        )

        if (!selectedOption) {
          throw new Error("Selected option not found")
        }

        const maxPoints = Math.max(...question.options.map(opt => opt.point))
        const pointsEarned = selectedOption.point

        await tx.questionResponse.upsert({
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

        return { success: true }
      }
    })

    return NextResponse.json(result)

  } catch (error) {
    console.error("[QUESTION_SUBMIT]", error)
    
    const errorResponse: SubmitAnswerResponse = {
      success: false,
      error: error instanceof Error ? error.message : "Internal server error"
    }
    
    return NextResponse.json(errorResponse, { 
      status: error instanceof Error ? 400 : 500 
    })
  }
}