import type { TestStatus } from "@/types/tests/progress"
import prisma from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function GET(
  req: Request,
  { params }: { params: { testId: string } }
) {
  try {
    const { userId } = await auth()
    const { testId } = params
    
    let attempts: Array<{
      status: TestStatus
      id: string
      startedAt: Date
      completedAt: Date | null
      totalScore: number
      percentageScore: number
    }> = []

    if (userId) {
      attempts = await prisma.testAttempt.findMany({
        where: {
          testId,
          userId
        },
        select: {
          id: true,
          status: true,
          startedAt: true,
          completedAt: true,
          totalScore: true,
          percentageScore: true
        },
        orderBy: {
          startedAt: 'desc'
        }
      })
    }

    return NextResponse.json({ attempts })
  } catch (error) {
    console.error("[TEST_GET]", error)
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    )
  }
}