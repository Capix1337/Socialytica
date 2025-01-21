// app/api/(test-taking)/tests/guest/attempt/[attemptId]/questions/route.ts
import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { 
  guestAttemptQuestionsQuerySchema,
  submitGuestAnswerSchema 
} from "@/lib/validations/guest-attempt"
import type { 
  GuestAttemptQuestion,
  GuestAttemptQuestionsResponse,
  SubmitGuestAnswerResponse 
} from "@/types/tests/guest-attempt"

// Update type definition for params
export async function GET(
  req: Request
): Promise<NextResponse<GuestAttemptQuestionsResponse | { error: string }>> {
  try {
    // Get attemptId from URL instead of params
    const attemptId = req.url.split('/attempt/')[1].split('/questions')[0]
    
    const validation = guestAttemptQuestionsQuerySchema.safeParse({
      attemptId
    })

    if (!validation.success) {
      return NextResponse.json({
        error: "Invalid attempt ID",
        details: validation.error.flatten()
      }, { status: 400 })
    }

    // 2. Get attempt with questions
    const attempt = await prisma.guestAttempt.findFirst({
      where: {
        id: attemptId,
        status: "IN_PROGRESS",
        expiresAt: {
          gt: new Date()
        }
      },
      include: {
        test: {
          select: {
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
                    text: true
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
      return NextResponse.json({ 
        error: "Guest attempt not found, expired, or completed" 
      }, { status: 404 })
    }

    // 3. Format response
    const questions: GuestAttemptQuestion[] = attempt.test.questions.map(
      question => ({
        id: question.id,
        attemptId: attempt.id,
        title: question.title,
        category: question.category,
        options: question.options,
        selectedOptionId: attempt.responses.find(
          r => r.questionId === question.id
        )?.selectedOptionId ?? null
      })
    )

    const response: GuestAttemptQuestionsResponse = {
      questions,
      totalQuestions: questions.length,
      answeredQuestions: attempt.responses.length
    }

    return NextResponse.json(response)

  } catch (error) {
    console.error("[GUEST_ATTEMPT_QUESTIONS_GET]", error)
    return NextResponse.json({ 
      error: "Internal server error" 
    }, { status: 500 })
  }
}

// Update PATCH handler similarly
export async function PATCH(
  req: Request
): Promise<NextResponse<SubmitGuestAnswerResponse>> {
  try {
    // Get attemptId from URL
    const attemptId = req.url.split('/attempt/')[1].split('/questions')[0]
    const json = await req.json()
    
    const validation = submitGuestAnswerSchema.safeParse({
      ...json,
      attemptId
    })

    if (!validation.success) {
      return NextResponse.json({
        success: false,
        error: "Invalid request data",
        details: validation.error.flatten()
      }, { status: 400 })
    }

    // Process answer submission in transaction
    const result = await prisma.$transaction(async (tx) => {
      // Verify attempt exists and is not expired
      const attempt = await tx.guestAttempt.findFirst({
        where: {
          id: attemptId,
          status: "IN_PROGRESS",
          expiresAt: {
            gt: new Date()
          }
        }
      })

      if (!attempt) {
        throw new Error("Guest attempt not found, expired, or not in progress")
      }

      // Calculate points
      const question = await tx.question.findFirst({
        where: { id: validation.data.questionId },
        include: { options: true }
      })

      if (!question) {
        throw new Error("Question not found")
      }

      const selectedOption = question.options.find(
        opt => opt.id === validation.data.selectedOptionId
      )

      if (!selectedOption) {
        throw new Error("Selected option not found")
      }

      const maxPoints = Math.max(...question.options.map(opt => opt.point))
      const pointsEarned = selectedOption.point

      // Save response
      await tx.guestResponse.upsert({
        where: {
          guestAttemptId_questionId: {
            guestAttemptId: attemptId,
            questionId: validation.data.questionId
          }
        },
        create: {
          guestAttemptId: attemptId,
          questionId: validation.data.questionId,
          selectedOptionId: validation.data.selectedOptionId,
          pointsEarned: pointsEarned,
          maxPoints: maxPoints
        },
        update: {
          selectedOptionId: validation.data.selectedOptionId,
          pointsEarned: pointsEarned,
          maxPoints: maxPoints
        }
      })

      return { success: true }
    })

    return NextResponse.json(result)

  } catch (error) {
    console.error("[GUEST_ANSWER_SUBMIT]", error)
    
    const errorResponse: SubmitGuestAnswerResponse = {
      success: false,
      error: error instanceof Error ? error.message : "Internal server error"
    }
    
    return NextResponse.json(errorResponse, { 
      status: error instanceof Error ? 400 : 500 
    })
  }
}