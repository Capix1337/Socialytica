// app/api/(test-taking)/tests/guest/attempt/route.ts
import { NextResponse } from "next/server"
import { v4 as uuidv4 } from 'uuid'
import prisma from "@/lib/prisma"
import { startGuestTestAttemptSchema } from "@/lib/validations/guest-attempt"
import type { GuestAttemptApiResponse } from "@/types/tests/guest-attempt"

export async function POST(request: Request) {
  try {
    // 1. Parse and validate request
    const validation = startGuestTestAttemptSchema.safeParse(await request.json())
    if (!validation.success) {
      return NextResponse.json({ 
        error: "Validation failed",
        details: validation.error.flatten() 
      }, { status: 400 })
    }

    // 2. Generate guest ID if not provided
    const guestId = validation.data.guestId || uuidv4()

    // 3. Begin transaction
    const result = await prisma.$transaction(async (tx) => {
      // 3.1 Check test exists and is published
      const test = await tx.test.findFirst({
        where: {
          id: validation.data.testId,
          isPublished: true
        },
        select: { id: true }
      })

      if (!test) {
        throw new Error("Test not found or not published")
      }

      // 3.2 Create new guest attempt
      return await tx.guestAttempt.create({
        data: {
          guestId,
          testId: test.id,
          status: "IN_PROGRESS",
          startedAt: new Date(),
          expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
        },
        select: {
          id: true,
          guestId: true,
          testId: true,
          startedAt: true,
          status: true,
          expiresAt: true
        }
      })
    })

    const response: GuestAttemptApiResponse = {
      guestAttempt: result
    }

    return NextResponse.json(response, { status: 201 })

  } catch (error) {
    console.error("[GUEST_ATTEMPT_CREATE]", error)
    
    if (error instanceof Error) {
      if (error.message === "Test not found or not published") {
        return NextResponse.json({ error: error.message }, { status: 404 })
      }
    }
    
    return NextResponse.json({ 
      error: "Internal server error" 
    }, { status: 500 })
  }
}