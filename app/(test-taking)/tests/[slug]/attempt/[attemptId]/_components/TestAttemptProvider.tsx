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
  const [isLoading, setIsLoading] = useState(true)
  const [isInitialLoad, setIsInitialLoad] = useState(true)

  const {
    questions,
    handleAnswerSelect,
    isPending,
    isSynced,
    fetchQuestions
  } = useAttemptState({ isSignedIn, attemptId })

  // Initialize attemptId from params
  useEffect(() => {
    const initializeAttempt = async () => {
      const resolvedParams = await params
      console.log('Resolved params:', resolvedParams)
      setAttemptId(resolvedParams.attemptId)
    }
    initializeAttempt()
  }, [params])

  // Fetch questions when attemptId is available
  useEffect(() => {
    if (attemptId) {
      console.log('Fetching questions for attemptId:', attemptId)
      fetchQuestions()
    }
  }, [attemptId, fetchQuestions])

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