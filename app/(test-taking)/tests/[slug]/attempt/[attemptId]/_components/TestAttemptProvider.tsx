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

  // Get questions and handlers from useAttemptState
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
      setAttemptId(resolvedParams.attemptId)
      setTestId(resolvedParams.testId)
    }
    initializeAttempt()
  }, [params])

  // Fetch questions when both IDs are available
  useEffect(() => {
    if (attemptId && testId) {
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