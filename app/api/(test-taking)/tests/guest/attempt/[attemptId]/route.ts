// app/api/(test-taking)/tests/guest/attempt/[attemptId]/route.ts
import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { guestAttemptQuerySchema } from "@/lib/validations/guest-attempt"
import type { GuestAttemptDetails } from "@/types/tests/guest-attempt"

export async function GET(
  req: Request
): Promise<NextResponse<GuestAttemptDetails | { error: string }>> {
  try {
    // Get attemptId from URL
    const attemptId = req.url.split('/attempt/')[1].split('/')[0]
    
    const validation = guestAttemptQuerySchema.safeParse({
      attemptId
    })
    
    if (!validation.success) {
      return NextResponse.json({
        error: "Invalid attempt ID",
        details: validation.error.flatten()
      }, { status: 400 })
    }

    // Get attempt with related data
    const attempt = await prisma.guestAttempt.findFirst({
      where: {
        id: attemptId,
        expiresAt: {
          gt: new Date() // Only return non-expired attempts
        }
      },
      include: {
        test: {
          select: {
            title: true,
            description: true,
            categories: {
              select: {
                id: true,
                name: true,
                description: true,
                scale: true
              }
            }
          }
        },
        responses: true,
        categoryScores: true
      }
    })

    if (!attempt) {
      return NextResponse.json({ 
        error: "Guest attempt not found or expired" 
      }, { status: 404 })
    }

    const response: GuestAttemptDetails = {
      id: attempt.id,
      guestId: attempt.guestId,
      test: attempt.test,
      startedAt: attempt.startedAt,
      status: attempt.status,
      expiresAt: attempt.expiresAt,
      progress: {
        totalResponses: attempt.responses.length,
        categoryScores: attempt.categoryScores
      }
    }

    return NextResponse.json(response)

  } catch (error) {
    console.error("[GUEST_ATTEMPT_GET]", error)
    return NextResponse.json({ 
      error: "Internal server error" 
    }, { status: 500 })
  }
}