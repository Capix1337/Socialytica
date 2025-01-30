// app/(test-taking)/tests/[slug]/attempt/[attemptId]/_components/TestAttemptProvider.tsx
"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@clerk/nextjs"
import { useAttemptState } from '@/hooks/useAttemptState'
import { TestAttemptContext } from "./TestAttemptContext"

interface TestAttemptProviderProps {
  children: React.ReactNode
  params: Promise<{
    testId: string
    attemptId: string
  }>
}

export function TestAttemptProvider({ params, children }: TestAttemptProviderProps) {
  const { isSignedIn } = useAuth()
  const [attemptId, setAttemptId] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)

  const {
    questions,
    handleAnswerSelect,
    isPending,
    isSynced
  } = useAttemptState({ isSignedIn, attemptId })

  useEffect(() => {
    params.then(resolvedParams => {
      setAttemptId(resolvedParams.attemptId)
    })
  }, [params])

  useEffect(() => {
    if (questions.length > 0) {
      setIsLoading(false)
    }
  }, [questions])

  const value = {
    questions,
    isLoading,
    handleAnswerSelect,
    isPending,
    isSynced,
  }

  return (
    <TestAttemptContext.Provider value={value}>
      {children}
    </TestAttemptContext.Provider>
  )
}