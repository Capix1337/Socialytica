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

export async function getPublicTest(slug: string) {
  const test = await prisma.test.findUnique({
    where: { 
      slug,
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
          questions: true,
          categories: true
        }
      }
    }
  });

  if (!test) return { test: null, attempts: [] };

  // Transform the data to match the Type definition
  const transformedTest: Test = {
    ...test,
    categories: test.categories.map(cat => ({
      ...cat,
      description: cat.description || null // Ensure null is handled
    }))
  };

  return { test: transformedTest, attempts: [] };
}