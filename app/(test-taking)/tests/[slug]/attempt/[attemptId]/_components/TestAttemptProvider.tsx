// app/(test-taking)/tests/[slug]/attempt/[attemptId]/_components/TestAttemptProvider.tsx
"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@clerk/nextjs"
import { useAttemptState } from '@/hooks/useAttemptState'
import { TestAttemptContext } from "./TestAttemptContext"
import { LoadingState } from "./LoadingState"  // Make sure path is correct

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
  const [testId, setTestId] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)
  const [isInitialLoad, setIsInitialLoad] = useState(true)

  const {
    questions,
    handleAnswerSelect,
    isPending,
    isSynced,
    fetchQuestions // Make sure this is exposed from useAttemptState
  } = useAttemptState({ isSignedIn, attemptId })

  useEffect(() => {
    params.then(resolvedParams => {
      setAttemptId(resolvedParams.attemptId)
      setTestId(resolvedParams.testId)
    })
  }, [params])

  // Add this effect to fetch questions when attemptId is available
  useEffect(() => {
    if (attemptId && testId) {
      fetchQuestions()
    }
  }, [attemptId, testId, fetchQuestions])

  useEffect(() => {
    if (questions.length > 0) {
      setIsLoading(false)
      setIsInitialLoad(false)
    }
  }, [questions])

  const value = {
    questions,
    isLoading,
    handleAnswerSelect,
    isPending,
    isSynced,
  }

  // Only show loading state on initial load
  if (isInitialLoad && isLoading) {
    return <LoadingState />
  }

  return (
    <TestAttemptContext.Provider value={value}>
      {children}
    </TestAttemptContext.Provider>
  )
}