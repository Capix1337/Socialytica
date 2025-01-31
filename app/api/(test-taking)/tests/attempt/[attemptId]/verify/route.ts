// app/api/tests/attempt/[attemptId]/verify/route.ts

import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import prisma from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const { userId } = await auth()
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { questionIds } = await req.json()
    const attemptId = req.url.split('/attempt/')[1].split('/verify')[0]

    const responses = await prisma.questionResponse.findMany({
      where: {
        testAttemptId: attemptId,
        questionId: { in: questionIds }
      }
    })

    const synced = responses.length === questionIds.length

    return NextResponse.json({ synced })
  } catch (error) {
    console.error('Verify sync error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}