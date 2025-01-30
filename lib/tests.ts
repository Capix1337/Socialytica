import type { PublicTestQueryParams } from "@/lib/validations/public-test"
import type { TestsResponse } from "@/types/tests/test"

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || ''

export async function getPublicTests(params: Partial<PublicTestQueryParams>): Promise<TestsResponse> {
  const searchParams = new URLSearchParams()
  if (params.page) searchParams.set('page', params.page)
  if (params.limit) searchParams.set('limit', params.limit)
  if (params.search) searchParams.set('search', params.search)

  const url = new URL(`/api/tests?${searchParams.toString()}`, BASE_URL)
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error('Failed to fetch tests')
  }

  return response.json()
}

export async function getPublicTest(slugOrId: string) {
  const test = await prisma.test.findFirst({
    where: {
      OR: [
        { id: slugOrId },
        { slug: slugOrId }
      ],
      isPublished: true
    },
    include: {
      categories: {
        include: {
          _count: {
            select: {
              questions: true
            }
          }
        }
      },
      _count: {
        select: {
          questions: true
        }
      }
    }
  })

  return { test, attempts: [] }
}