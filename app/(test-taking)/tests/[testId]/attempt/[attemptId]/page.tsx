"use client"

import { useState, useEffect, useCallback } from "react"
import { useAuth } from "@clerk/nextjs"
import { cn } from "@/lib/utils"
import { type TestAttemptQuestion } from "@/types/tests/test-attempt-question"
import { LoadingState } from "./_components/LoadingState"
import { TestHeader } from "./_components/TestHeader"
import { CategoryTabs } from "./_components/CategoryTabs"
import { QuestionCard } from "./_components/QuestionCard"
import { NavigationControls } from "./_components/NavigationControls"
import { CompletionDialog } from "./_components/CompletionDialog"


interface TestAttemptPageProps {
  params: Promise<{
    testId: string
    attemptId: string
  }>
}

export default function TestAttemptPage({ params }: TestAttemptPageProps) {
  const { isSignedIn } = useAuth()
  const [questions, setQuestions] = useState<TestAttemptQuestion[]>([])
  const [currentQuestionId, setCurrentQuestionId] = useState<string>("")
  const [currentCategoryId, setCurrentCategoryId] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)
  const [attemptId, setAttemptId] = useState<string>("")
  const [testId, setTestId] = useState<string>("")
  const [showCompletionDialog, setShowCompletionDialog] = useState(false)

  const fetchQuestions = useCallback(async () => {
    if (!attemptId) return

    try {
      const endpoint = isSignedIn 
        ? `/api/tests/attempt/${attemptId}/questions`
        : `/api/tests/guest/attempt/${attemptId}/questions`

      const response = await fetch(endpoint)
      if (!response.ok) {
        throw new Error(await response.text())
      }

      const data = await response.json()
      setQuestions(data.questions)
      if (data.questions.length > 0) {
        setCurrentQuestionId(data.questions[0].id)
        setCurrentCategoryId(data.questions[0].question.categoryId || "uncategorized")
      }
    } catch (error) {
      console.error("Failed to load questions:", error)
    } finally {
      setIsLoading(false)
    }
  }, [attemptId, isSignedIn])

  const submitAnswer = async (questionId: string, selectedOptionId: string) => {
    try {
      const endpoint = isSignedIn
        ? `/api/tests/attempt/${attemptId}/questions`
        : `/api/tests/guest/attempt/${attemptId}/questions`

      const response = await fetch(endpoint, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          questionId,
          selectedOptionId
        })
      })

      if (!response.ok) {
        throw new Error('Failed to submit answer')
      }

      // ... handle success
    } catch (error) {
      console.error('Failed to submit answer:', error)
    }
  }

  const handleAnswerSelect = useCallback(async (questionId: string, optionId: string) => {
    try {
      await submitAnswer(questionId, optionId)

      setQuestions(prev => prev.map(q => 
        q.questionId === questionId
          ? { ...q, selectedOptionId: optionId, isAnswered: true }
          : q
      ))

      // Find the current category's questions
      const currentCategoryQuestions = questions.filter(
        q => (q.question.categoryId || "uncategorized") === currentCategoryId
      )
      
      // Find the index within the current category
      const currentIndexInCategory = currentCategoryQuestions.findIndex(
        q => q.questionId === questionId
      )

      // Check if this was the last question in the current category
      if (currentIndexInCategory === currentCategoryQuestions.length - 1) {
        // Find the next category that has unanswered questions
        const categoryIds = Array.from(new Set(questions.map(q => q.question.categoryId || "uncategorized")))
        const currentCategoryIndex = categoryIds.indexOf(currentCategoryId)
        
        // Look for next category with unanswered questions
        for (let i = currentCategoryIndex + 1; i < categoryIds.length; i++) {
          const nextCategoryQuestions = questions.filter(
            q => (q.question.categoryId || "uncategorized") === categoryIds[i]
          )
          const hasUnansweredQuestions = nextCategoryQuestions.some(q => !q.isAnswered)
          
          if (hasUnansweredQuestions) {
            // Switch to next category and set first unanswered question as current
            const nextQuestion = nextCategoryQuestions.find(q => !q.isAnswered)
            if (nextQuestion) {
              setCurrentCategoryId(categoryIds[i])
              setCurrentQuestionId(nextQuestion.id)
              
              // Scroll to the next question after state updates
              requestAnimationFrame(() => {
                const questionNumber = questions.findIndex(q => q.id === nextQuestion.id) + 1
                const nextQuestionElement = document.getElementById(`question-${questionNumber}`)
                
                if (nextQuestionElement) {
                  const headerOffset = 140
                  const elementPosition = nextQuestionElement.getBoundingClientRect().top
                  const offsetPosition = elementPosition + window.pageYOffset - headerOffset
                  
                  window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                  })
                }
              })
            }
            return
          }
        }
      } else if (currentIndexInCategory < currentCategoryQuestions.length - 1) {
        // If not the last question in category, move to next question in same category
        const nextQuestion = currentCategoryQuestions[currentIndexInCategory + 1]
        setCurrentQuestionId(nextQuestion.id)
        
        // Scroll to next question
        requestAnimationFrame(() => {
          const questionNumber = questions.findIndex(q => q.id === nextQuestion.id) + 1
          const nextQuestionElement = document.getElementById(`question-${questionNumber}`)
          
          if (nextQuestionElement) {
            const headerOffset = 140
            const elementPosition = nextQuestionElement.getBoundingClientRect().top
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset
            
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            })
          }
        })
      }
    } catch (error) {
      console.error("Error saving answer:", error)
    }
  }, [attemptId, questions, currentCategoryId])

  // Resolve params since they're a Promise
  useEffect(() => {
    params.then(resolvedParams => {
      setAttemptId(resolvedParams.attemptId)
      setTestId(resolvedParams.testId)
    })
  }, [params])

  // Fetch questions when attemptId is available
  useEffect(() => {
    fetchQuestions()
  }, [fetchQuestions])

  if (isLoading) return <LoadingState />

  // Group questions by category
  const questionsByCategory = questions.reduce((acc, question) => {
    const categoryId = question.question.categoryId || "uncategorized"
    if (!acc[categoryId]) {
      acc[categoryId] = {
        id: categoryId,
        name: question.question.category?.name || "Uncategorized",
        questions: [],
        totalQuestions: 0,
        answeredQuestions: 0
      }
    }
    acc[categoryId].questions.push(question)
    acc[categoryId].totalQuestions++
    if (question.isAnswered) {
      acc[categoryId].answeredQuestions++
    }
    return acc
  }, {} as Record<string, {
    id: string
    name: string
    questions: TestAttemptQuestion[]
    totalQuestions: number
    answeredQuestions: number
  }>)

  const categories = Object.values(questionsByCategory)
  const currentCategory = questionsByCategory[currentCategoryId]
  const totalQuestions = questions.length
  const answeredQuestions = questions.filter(q => q.isAnswered).length
  const currentCategoryProgress = currentCategory 
    ? (currentCategory.answeredQuestions / currentCategory.totalQuestions) * 100
    : 0

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Remove pt-6 and add padding-top to account for the sticky header */}
      <div className="pb-24">
        {/* Change TestHeader from fixed to sticky */}
        <div className="sticky top-16 z-40 bg-gray-50">
          <TestHeader
            title="Test Taking"
            currentCategory={currentCategory?.name || ""}
            totalQuestions={totalQuestions}
            answeredQuestions={answeredQuestions}
            currentCategoryProgress={currentCategoryProgress}
          />
        </div>

        <div className="container max-w-7xl mx-auto px-4 mt-6">
          {/* Rest of the content remains the same */}
          <div className="mb-6">
            <CategoryTabs
              categories={categories}
              currentCategoryId={currentCategoryId}
              onCategoryChange={setCurrentCategoryId}
            />
          </div>

          <main className="space-y-6 mb-20"> {/* Add margin-bottom for navigation */}
            {currentCategory?.questions.map((question, index) => (
              <QuestionCard
                key={question.id}
                question={{
                  id: question.questionId,
                  title: question.question.title,
                  options: question.question.options.map(opt => ({
                    id: opt.id,
                    text: opt.text
                  }))
                }}
                questionNumber={index + 1}
                selectedOption={question.selectedOptionId || undefined}
                isAnswered={question.isAnswered}
                onAnswerSelect={(optionId) => handleAnswerSelect(question.questionId, optionId)} // Keep using question.questionId
                className={cn(
                  "transition-all duration-200",
                  question.id === currentQuestionId 
                    ? "opacity-100 ring-2 ring-primary" 
                    : "opacity-70 hover:opacity-90"
                )}
              />
            ))}
          </main>
        </div>

        {/* Change NavigationControls from fixed to sticky */}
        <div className="sticky bottom-0 mt-6 bg-background border-t">
          <NavigationControls
            testId={testId}
            attemptId={attemptId}
            currentQuestionNumber={questions.findIndex(q => q.id === currentQuestionId) + 1}
            totalQuestions={totalQuestions}
            answeredQuestions={answeredQuestions}
            canGoNext={questions.findIndex(q => q.id === currentQuestionId) < questions.length - 1}
            canGoPrevious={questions.findIndex(q => q.id === currentQuestionId) > 0}
            onNext={() => {
              const currentIndex = questions.findIndex(q => q.id === currentQuestionId)
              if (currentIndex < questions.length - 1) {
                setCurrentQuestionId(questions[currentIndex + 1].id)
                setCurrentCategoryId(questions[currentIndex + 1].question.categoryId || "uncategorized")
              }
            }}
            onPrevious={() => {
              const currentIndex = questions.findIndex(q => q.id === currentQuestionId)
              if (currentIndex > 0) {
                setCurrentQuestionId(questions[currentIndex - 1].id)
                setCurrentCategoryId(questions[currentIndex - 1].question.categoryId || "uncategorized")
              }
            }}
          />
        </div>
      </div>

      <CompletionDialog
        isOpen={showCompletionDialog}
        onOpenChange={setShowCompletionDialog}
        testId={testId}
        attemptId={attemptId}
        questions={questions}
      />
    </div>
  )
}