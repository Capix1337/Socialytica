// app/api/admin/users/route.ts
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { userQuerySchema } from "@/lib/validations/users"
import type { UserListResponse } from "@/types/admin/users"

export async function GET(req: Request): Promise<NextResponse<UserListResponse | { error: string }>> {
  try {
    // 1. Auth check
    const { userId } = await auth()
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    // 2. Admin role check
    const { sessionClaims } = await auth()
    if (sessionClaims?.metadata?.role !== "admin") {
      return new NextResponse('Forbidden', { status: 403 })
    }

    // 3. Parse and validate query parameters
    const { searchParams } = new URL(req.url)
    const queryResult = userQuerySchema.safeParse({
      page: searchParams.get('page') ?? '1',
      limit: searchParams.get('limit') ?? '10',
      search: searchParams.get('search') ?? '',
      sort: searchParams.get('sort') ?? 'desc',
      country: searchParams.get('country') || undefined
    })

    if (!queryResult.success) {
      return NextResponse.json(
        { 
          message: 'Invalid query parameters',
          errors: queryResult.error.flatten()
        },
        { status: 400 }
      )
    }

    // 4. Set up pagination
    const page = Math.max(1, parseInt(queryResult.data.page))
    const limit = Math.max(1, Math.min(100, parseInt(queryResult.data.limit)))
    const skip = (page - 1) * limit

    // 5. Build where clause
    const whereClause = {
      ...(queryResult.data.search && {
        OR: [
          { firstName: { contains: queryResult.data.search, mode: 'insensitive' as Prisma.QueryMode } },
          { lastName: { contains: queryResult.data.search, mode: 'insensitive' as Prisma.QueryMode } },
          { email: { contains: queryResult.data.search, mode: 'insensitive' as Prisma.QueryMode } }
        ]
      }),
      ...(queryResult.data.country && {
        profile: {
          countryOfOrigin: queryResult.data.country
        }
      })
    }

    // 6. Execute query
    const [totalUsers, users] = await Promise.all([
      prisma.user.count({ where: whereClause }),
      prisma.user.findMany({
        where: whereClause,
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
        orderBy: { createdAt: queryResult.data.sort }
      })
    ])

    return NextResponse.json({
      users: users.map(user => ({
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        imageUrl: user.imageUrl,
        country: user.profile?.countryOfOrigin,
        totalTests: user._count.testAttempts,
        createdAt: user.createdAt
      })),
      totalUsers,
      currentPage: page,
      totalPages: Math.ceil(totalUsers / limit)
    })

  } catch (error) {
    console.error('[USERS_GET]', error)
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    )
  }
}