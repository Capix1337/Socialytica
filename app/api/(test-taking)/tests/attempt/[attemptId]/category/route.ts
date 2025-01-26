import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import { z } from "zod"
import prisma from "@/lib/prisma"

const categoryCompletionSchema = z.object({
  categoryId: z.string().cuid("Invalid category ID"),
  isCompleted: z.boolean(),
  nextCategoryId: z.string().cuid("Invalid next category ID").nullable()
})

export async function POST(req: Request) {
  try {
    const { userId: clerkUserId } = await auth()
    if (!clerkUserId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const attemptId = req.url.split("/attempt/")[1].split("/category")[0]
    const body = await req.json()
    const validation = categoryCompletionSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid request data", details: validation.error.flatten() },
        { status: 400 }
      )
    }

    const { categoryId, isCompleted, nextCategoryId } = validation.data

    const user = await prisma.user.findUnique({
      where: { clerkUserId },
      select: { id: true }
    })

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      )
    }

    // Update attempt with category completion status
    const updatedAttempt = await prisma.testAttempt.update({
      where: {
        id: attemptId,
        userId: user.id,
        status: "IN_PROGRESS"
      },
      data: {
        currentCategoryId: isCompleted ? nextCategoryId : categoryId
      }
    })

    if (!updatedAttempt) {
      return NextResponse.json(
        { error: "Test attempt not found or not in progress" },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      nextCategoryId,
      currentCategoryId: updatedAttempt.currentCategoryId
    })
  } catch (error) {
    console.error("[CATEGORY_COMPLETION]", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}