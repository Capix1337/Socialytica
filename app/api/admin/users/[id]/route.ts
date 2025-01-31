// app/api/admin/users/[id]/route.ts

import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import type { UserDetailsResponse } from "@/types/admin/users"

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
): Promise<NextResponse<UserDetailsResponse | { error: string }>> {
  try {
    // 1. Auth check
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // 2. Admin role check
    const { sessionClaims } = await auth()
    if (sessionClaims?.metadata?.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    // 3. Get user details with related data
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
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // 4. Calculate test statistics
    const testStats = {
      totalTests: user.testAttempts.length,
      averageScore: user.testAttempts.reduce((acc, curr) => acc + (curr.percentageScore || 0), 0) / (user.testAttempts.length || 1),
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
    }

    // 5. Format response
    return NextResponse.json({
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      imageUrl: user.imageUrl,
      profile: user.profile,
      stats: testStats,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    })

  } catch (error) {
    console.error("[USER_GET]", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}