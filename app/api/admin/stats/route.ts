import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET() {
  try {
    // Admin authorization check
    const { userId, sessionClaims } = await auth()
    if (!userId || sessionClaims?.metadata?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get all stats in parallel
    const [
      usersStats,
      testsStats,
      attemptsStats,
      recentUsers
    ] = await Promise.all([
      // Users statistics
      prisma.user.aggregate({
        _count: { id: true },
        _max: { createdAt: true }
      }),

      // Tests statistics
      prisma.test.aggregate({
        _count: { id: true },
        where: { isPublished: true }
      }),

      // Attempts statistics
      prisma.testAttempt.aggregate({
        _count: { id: true },
        _avg: { percentageScore: true }
      }),

      // Recent registrations (last 30 days)
      prisma.user.count({
        where: {
          createdAt: {
            gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
          }
        }
      })
    ])

    return NextResponse.json({
      overview: {
        totalUsers: usersStats._count.id,
        totalTests: testsStats._count.id,
        totalAttempts: attemptsStats._count.id,
        recentRegistrations: recentUsers,
        averageScore: attemptsStats._avg.percentageScore || 0
      },
      lastUpdated: new Date().toISOString()
    })

  } catch (error) {
    console.error("[ADMIN_DASHBOARD_STATS_GET]", error)
    return NextResponse.json(
      { error: "Internal server error" }, 
      { status: 500 }
    )
  }
}