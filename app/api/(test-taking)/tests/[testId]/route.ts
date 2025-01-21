// app/api/(test-taking)/tests/[testId]/route.ts

import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
// import type { TestAttempt } from '@/types/tests/test-attempt'

export async function GET(req: Request) {
  try {
    const { userId } = await auth()

    // Extract testId from URL following admin route pattern
    const testId = req.url.split('/tests/')[1].split('/')[0]
    if (!testId) {
      return new NextResponse('Invalid test ID', { status: 400 })
    }

    // Fetch test details - always visible to guests and users
    const test = await prisma.test.findUnique({
      where: {
        id: testId,
        isPublished: true // Only return published tests
      },
      select: {
        id: true,
        title: true,
        description: true,
        categories: {
          select: {
            id: true,
            name: true,
            description: true,
            scale: true,
            _count: {
              select: {
                questions: true
              }
            }
          }
        },
        _count: {  // Add this to get total questions count
          select: {
            questions: true
          }
        }
      }
    })

    if (!test) {
      return NextResponse.json(
        { message: 'Test not found' },
        { status: 404 }
      )
    }

    // Get attempts only if user is authenticated
    let attempts = []
    if (userId) {
      attempts = await prisma.testAttempt.findMany({
        where: {
          testId,
          userId
        },
        select: {
          id: true,
          startedAt: true,
          completedAt: true,
          status: true,
          totalScore: true,
          percentageScore: true
        },
        orderBy: {
          startedAt: 'desc'
        }
      })
    }

    return NextResponse.json({ 
      test,
      attempts
    })
  } catch (error) {
    console.error('[TEST_GET]', error)
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    )
  }
}