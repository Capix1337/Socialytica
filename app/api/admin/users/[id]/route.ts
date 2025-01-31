// app/api/admin/users/[id]/route.ts
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import type { UserDetailsResponse } from "@/types/admin/users"

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const { sessionClaims } = await auth()
    if (sessionClaims?.metadata?.role !== "admin") {
      return new NextResponse('Forbidden', { status: 403 })
    }

    const user = await prisma.user.findUnique({
      where: { id: params.id },
      include: {
        profile: true,
        testAttempts: {
          where: { status: "COMPLETED" },
          include: {
            test: {
              select: {
                title: true,
                description: true
              }
            },
            categoryScores: {
              include: {
                category: true
              }
            }
          },
          orderBy: {
            completedAt: "desc"
          }
        }
      }
    })

    if (!user) {
      return new NextResponse('Not Found', { status: 404 })
    }

    const response: UserDetailsResponse = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      imageUrl: user.imageUrl,
      profile: user.profile,
      stats: {
        totalTests: user.testAttempts.length,
        averageScore: user.testAttempts.reduce((acc, curr) => 
          acc + (curr.percentageScore || 0), 0) / (user.testAttempts.length || 1),
        testsHistory: user.testAttempts.map(attempt => ({
          testId: attempt.testId,
          testTitle: attempt.test.title,
          completedAt: attempt.completedAt,
          score: attempt.percentageScore,
          categoryScores: attempt.categoryScores.map(score => ({
            category: score.category.name,
            score: score.actualScore,
            maxScore: score.maxScale
          }))
        }))
      },
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    }

    return NextResponse.json(response)

  } catch (error) {
    console.error('[USER_GET]', error)
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    )
  }
}