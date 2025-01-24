"use client"

import { TestAttemptProvider } from "./_components/TestAttemptProvider"
import { TestAttemptLayout } from "./_components/TestAttemptLayout"

interface TestAttemptPageProps {
  params: Promise<{
    testId: string
    attemptId: string
  }>
}

export default function TestAttemptPage({ params }: TestAttemptPageProps) {
  return (
    <TestAttemptProvider params={params}>
      <TestAttemptLayout />
    </TestAttemptProvider>
  )
}