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

    // Update guest attempt with category completion status
    const updatedAttempt = await prisma.guestAttempt.update({
      where: {
        id: attemptId,
        status: "IN_PROGRESS",
        expiresAt: {
          gt: new Date()
        }
      },
      data: {
        currentCategoryId: isCompleted ? nextCategoryId : categoryId
      }
    })

    if (!updatedAttempt) {
      return NextResponse.json(
        { error: "Guest attempt not found, expired, or not in progress" },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      nextCategoryId,
      currentCategoryId: updatedAttempt.currentCategoryId
    })
  } catch (error) {
    console.error("[GUEST_CATEGORY_COMPLETION]", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}