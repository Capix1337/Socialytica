"use client"

import { useTestAttempt } from "./TestAttemptContext"
import { TestHeader } from "./TestHeader"
import { QuestionManager } from "./QuestionManager"
import { CompletionDialog } from "./CompletionDialog"
import { LoadingState } from "./LoadingState"
import { isGuestQuestion } from "@/lib/utils/question-helpers"

export function TestAttemptLayout() {
  const {
    isLoading,
    questions,
    currentCategory, // Now using currentCategory from context
    showCompletionDialog,
    setShowCompletionDialog,
    testId,
    attemptId,
  } = useTestAttempt()

  if (isLoading) return <LoadingState />

  // Calculate total progress
  const totalQuestions = questions.length
  const answeredQuestions = questions.filter(q => 
    isGuestQuestion(q) ? !!q.selectedOptionId : q.isAnswered
  ).length

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pb-24">
        <div className="sticky top-16 z-40 bg-gray-50">
          <TestHeader
            title="Test Taking"
            currentCategory={currentCategory?.name || ""}
            totalQuestions={totalQuestions}
            answeredQuestions={answeredQuestions}
          />
        </div>

        <div className="container max-w-7xl mx-auto px-4 mt-6">
          {currentCategory && <QuestionManager currentCategory={currentCategory} />}
        </div>

        <CompletionDialog
          isOpen={showCompletionDialog}
          onOpenChange={setShowCompletionDialog}
          testId={testId}
          attemptId={attemptId}
          questions={questions}
        />
      </div>
    </div>
  )
}