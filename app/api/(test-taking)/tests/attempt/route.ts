//app/api/(test-taking)/tests/attempt/route.ts

import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import { v4 as uuidv4 } from 'uuid'
import prisma from "@/lib/prisma"
import { startTestAttemptSchema } from "@/lib/validations/test-attempt"
import type { TestAttemptApiResponse } from "@/types/tests/test-attempt"

export async function POST(request: Request) {
  try {
    const { userId: clerkUserId } = await auth()
    
    // Parse request
    const validation = startTestAttemptSchema.safeParse(await request.json())
    if (!validation.success) {
      return NextResponse.json({ 
        error: "Validation failed",
        details: validation.error.flatten() 
      }, { status: 400 })
    }

    // Handle guest attempt creation directly
    if (!clerkUserId) {
      const guestId = validation.data.guestId || uuidv4()

      const result = await prisma.$transaction(async (tx) => {
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
            testId: true,
            guestId: true,
            startedAt: true,
            status: true
          }
        })
      })

      return NextResponse.json({
        testAttempt: {
          ...result,
          userId: undefined
        }
      }, { status: 201 })
    }

    // Continue with authenticated user flow...
    const user = await prisma.user.findUnique({
      where: { clerkUserId },
      select: { id: true }
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // 4. Begin transaction
    const result = await prisma.$transaction(async (tx) => {
      // 4.1 Check test exists and is published
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

      // 4.2 Check for existing attempt
      const existingAttempt = await tx.testAttempt.findFirst({
        where: {
          testId: test.id,
          userId: user.id,
          status: "IN_PROGRESS"
        },
        select: {
          id: true,
          testId: true,
          userId: true,
          startedAt: true,
          status: true
        }
      })

      // 4.3 If existing attempt found, return it instead of creating new one
      if (existingAttempt) {
        return existingAttempt
      }

      // 4.4 Create new attempt if none exists
      return await tx.testAttempt.create({
        data: {
          testId: test.id,
          userId: user.id,
          status: "IN_PROGRESS",
          startedAt: new Date()
        },
        select: {
          id: true,
          testId: true,
          userId: true,
          startedAt: true,
          status: true
        }
      })
    })

    const response: TestAttemptApiResponse = {
      testAttempt: result
    }

    return NextResponse.json(response, { status: 201 })

  } catch (error) {
    console.error("[TEST_ATTEMPT_CREATE]", error)
    return NextResponse.json({ 
      error: "Internal server error" 
    }, { status: 500 })
  }
}