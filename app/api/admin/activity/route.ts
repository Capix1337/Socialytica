import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET() {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get recent activity across all users
    const recentActivity = await prisma.$transaction(async (tx) => {
      const [
        recentTestCompletions,
        recentRegistrations,
        recentTestCreations,
      ] = await Promise.all([
        // Recent test completions
        tx.testAttempt.findMany({
          where: { status: "COMPLETED" },
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
                email: true
              }
            },
            test: {
              select: {
                title: true
              }
            }
          },
          orderBy: { completedAt: 'desc' },
          take: 5
        }),

        // Recent user registrations
        tx.user.findMany({
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            createdAt: true
          },
          orderBy: { createdAt: 'desc' },
          take: 5
        }),

        // Recent test creations
        tx.test.findMany({
          where: { isPublished: true },
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true
              }
            }
          },
          orderBy: { createdAt: 'desc' },
          take: 5
        })
      ])

      return {
        testCompletions: recentTestCompletions,
        newUsers: recentRegistrations,
        newTests: recentTestCreations
      }
    })

    return NextResponse.json(recentActivity)

  } catch (error) {
    console.error("[ADMIN_DASHBOARD_ACTIVITY_GET]", error)
    return NextResponse.json(
      { error: "Internal server error" }, 
      { status: 500 }
    )
  }
}