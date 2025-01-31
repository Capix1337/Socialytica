// app/api/admin/users/route.ts

import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { z } from "zod"
import prisma from "@/lib/prisma"
import type { UserListResponse } from "@/types/admin/users"

// Validation schema for query parameters
const querySchema = z.object({
  page: z.string().default("1"),
  limit: z.string().default("10"),
  search: z.string().default(""),
  country: z.string().optional(),
  sort: z.enum(["asc", "desc"]).default("desc")
})

export async function GET(req: Request): Promise<NextResponse<UserListResponse | { error: string }>> {
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

    // 3. Parse query parameters
    const { searchParams } = new URL(req.url)
    const validation = querySchema.safeParse({
      page: searchParams.get("page"),
      limit: searchParams.get("limit"),
      search: searchParams.get("search"),
      country: searchParams.get("country"),
      sort: searchParams.get("sort")
    })

    if (!validation.success) {
      return NextResponse.json({ error: "Invalid query parameters" }, { status: 400 })
    }

    const page = Math.max(1, parseInt(validation.data.page))
    const limit = Math.max(1, Math.min(100, parseInt(validation.data.limit)))
    const skip = (page - 1) * limit

    // 4. Build where clause
    const whereConditions = {
      ...(validation.data.search ? {
        OR: [
          { firstName: { contains: validation.data.search, mode: 'insensitive' } },
          { lastName: { contains: validation.data.search, mode: 'insensitive' } },
          { email: { contains: validation.data.search, mode: 'insensitive' } }
        ]
      } : {}),
      ...(validation.data.country ? {
        profile: {
          countryOfOrigin: validation.data.country
        }
      } : {})
    }

    // 5. Execute queries
    const [totalUsers, users] = await Promise.all([
      prisma.user.count({ where: whereConditions }),
      prisma.user.findMany({
        where: whereConditions,
        include: {
          profile: true,
          _count: {
            select: {
              testAttempts: {
                where: { status: "COMPLETED" }
              }
            }
          }
        },
        skip,
        take: limit,
        orderBy: { createdAt: validation.data.sort }
      })
    ])

    // 6. Format response
    const formattedUsers = users.map(user => ({
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      imageUrl: user.imageUrl,
      country: user.profile?.countryOfOrigin,
      totalTests: user._count.testAttempts,
      createdAt: user.createdAt
    }))

    return NextResponse.json({
      users: formattedUsers,
      totalUsers,
      currentPage: page,
      totalPages: Math.ceil(totalUsers / limit)
    })

  } catch (error) {
    console.error("[USERS_GET]", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}