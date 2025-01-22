// app/(test-taking)/tests/[testId]/attempt/[attemptId]/_components/TestAttemptLayout.tsx
"use client"

import { useTestAttempt } from "./TestAttemptContext"
import { TestHeader } from "./TestHeader"
import { CategoryTabs } from "./CategoryTabs"
import { QuestionManager } from "./QuestionManager"
// import { NavigationControls } from "./NavigationControls"
import { CompletionDialog } from "./CompletionDialog"
import { LoadingState } from "./LoadingState"
import { isGuestQuestion } from "@/lib/utils/question-helpers"

export function TestAttemptLayout() {
  const {
    isLoading,
    questions,
    // currentQuestionId,
    currentCategoryId,
    showCompletionDialog,
    setShowCompletionDialog,
    setCurrentCategoryId,
    testId,
    attemptId
  } = useTestAttempt()

  if (isLoading) return <LoadingState />

  // Group questions by category
  const questionsByCategory = questions.reduce((acc, question) => {
    const categoryId = isGuestQuestion(question) 
      ? question.category?.id || "uncategorized"
      : question.question.categoryId || "uncategorized"
      
    const categoryName = isGuestQuestion(question)
      ? question.category?.name || "Uncategorized"
      : question.question.category?.name || "Uncategorized"

    if (!acc[categoryId]) {
      acc[categoryId] = {
        id: categoryId,
        name: categoryName,
        questions: [],
        totalQuestions: 0,
        answeredQuestions: 0
      }
    }

    acc[categoryId].questions.push(question)
    acc[categoryId].totalQuestions++
    
    if (isGuestQuestion(question) ? !!question.selectedOptionId : question.isAnswered) {
      acc[categoryId].answeredQuestions++
    }

    return acc
  }, {} as Record<string, {
    id: string
    name: string
    questions: typeof questions
    totalQuestions: number
    answeredQuestions: number
  }>)

  const categories = Object.values(questionsByCategory)
  const currentCategory = questionsByCategory[currentCategoryId]
  const totalQuestions = questions.length
  const answeredQuestions = questions.filter(q => 
    isGuestQuestion(q) ? !!q.selectedOptionId : q.isAnswered
  ).length
  const currentCategoryProgress = currentCategory 
    ? (currentCategory.answeredQuestions / currentCategory.totalQuestions) * 100
    : 0

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pb-24">
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
          <div className="mb-6">
            <CategoryTabs
              categories={categories}
              currentCategoryId={currentCategoryId}
              onCategoryChange={setCurrentCategoryId}
            />
          </div>

          <QuestionManager currentCategory={currentCategory} />
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