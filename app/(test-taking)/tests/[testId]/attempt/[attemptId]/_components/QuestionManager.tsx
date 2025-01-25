// app/(test-taking)/tests/[testId]/attempt/[attemptId]/_components/QuestionManager.tsx
"use client"

import { useTestAttempt } from "./TestAttemptContext"
import { QuestionCard } from "./QuestionCard"
import { NavigationControls } from "./NavigationControls"
import { cn } from "@/lib/utils"
import { 
    // isGuestQuestion, 
    getQuestionData } from "@/lib/utils/question-helpers"
import type { TestAttemptQuestion } from "@/types/tests/test-attempt-question"
import type { GuestAttemptQuestion } from "@/types/tests/guest-attempt"

interface QuestionManagerProps {
  currentCategory: {
    questions: (TestAttemptQuestion | GuestAttemptQuestion)[]
    name: string
  }
}

export function QuestionManager({ currentCategory }: QuestionManagerProps) {
  const {
    testId,
    attemptId,
    questions,
    currentQuestionId,
    handleAnswerSelect,
    setCurrentQuestionId
  } = useTestAttempt()

  const totalQuestions = questions.length
  const answeredQuestions = questions.filter(q => getQuestionData(q).isAnswered).length

  return (
    <>
      <main className="space-y-6 mb-20">
        {currentCategory?.questions.map((question, index) => {
          const questionData = getQuestionData(question)
          
          return (
            <QuestionCard
              key={question.id}
              question={{
                id: questionData.id,
                title: questionData.title,
                options: questionData.options.map(opt => ({
                  id: opt.id,
                  text: opt.text
                }))
              }}
              questionNumber={index + 1}
              selectedOption={question.selectedOptionId || undefined}
              isAnswered={questionData.isAnswered}
              onAnswerSelect={(optionId) => handleAnswerSelect(questionData.id, optionId)}
              className={cn(
                "transition-all duration-200",
                question.id === currentQuestionId 
                  ? "opacity-100 ring-2 ring-primary" 
                  : "opacity-70 hover:opacity-90"
              )}
            />
          )
        })}
      </main>

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
            }
          }}
          onPrevious={() => {
            const currentIndex = questions.findIndex(q => q.id === currentQuestionId)
            if (currentIndex > 0) {
              setCurrentQuestionId(questions[currentIndex - 1].id)
            }
          }}
        />
      </div>
    </>
  )
}