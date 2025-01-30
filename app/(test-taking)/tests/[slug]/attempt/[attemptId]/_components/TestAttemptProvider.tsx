// app/(test-taking)/tests/[slug]/attempt/[attemptId]/_components/TestAttemptProvider.tsx
"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@clerk/nextjs"
import { useAttemptState } from '@/hooks/useAttemptState'
import { TestAttemptContext } from "./TestAttemptContext"
import { LoadingState } from "./LoadingState"

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

  // Fetch questions using useAttemptState
  const {
    questions,
    handleAnswerSelect,
    isPending,
    isSynced,
    fetchQuestions
  } = useAttemptState({ 
    isSignedIn, 
    attemptId,
    testId 
  })

  // Initialize IDs from params
  useEffect(() => {
    const initializeAttempt = async () => {
      const resolvedParams = await params
      console.log('Resolved params:', resolvedParams) // Debug log
      setAttemptId(resolvedParams.attemptId)
      setTestId(resolvedParams.testId)
    }
    initializeAttempt()
  }, [params])

  // Fetch questions when both IDs are available
  useEffect(() => {
    if (attemptId && testId) {
      console.log('Fetching questions with:', { attemptId, testId }) // Debug log
      fetchQuestions()
    }
  }, [attemptId, testId, fetchQuestions])

  // Update loading states
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

  if (isInitialLoad && isLoading) {
    return <LoadingState />
  }

  return (
    <TestAttemptContext.Provider value={value}>
      {children}
    </TestAttemptContext.Provider>
  )
}