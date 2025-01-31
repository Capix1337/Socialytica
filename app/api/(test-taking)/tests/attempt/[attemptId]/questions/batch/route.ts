import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function PATCH(req: Request) {
  try {
    const { userId: clerkUserId } = await auth()
    if (!clerkUserId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const attemptId = req.url.split('/attempt/')[1].split('/')[0]
    const { answers } = await req.json()

    const result = await prisma.$transaction(async (prismaClient) => {
      const results = await Promise.all(
        answers.map(async ({ questionId, selectedOptionId }) => {
          try {
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
                selectedOptionId
              },
              update: {
                selectedOptionId
              }
            })
            return { questionId, success: true }
          } catch (error) {
            console.error(`Failed to save answer for question ${questionId}:`, error)
            return { questionId, success: false, error: 'Failed to save answer' }
          }
        })
      )
      return { success: true, results }
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error('Batch update failed:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Internal server error' 
    }, { status: 500 })
  }
}