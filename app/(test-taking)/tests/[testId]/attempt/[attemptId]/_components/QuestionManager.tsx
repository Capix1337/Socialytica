"use client"

import { useEffect } from "react" // Add this import
import { useTestAttempt } from "./TestAttemptContext"
import { QuestionCard } from "./QuestionCard"
import { NavigationControls } from "./NavigationControls"
import { cn } from "@/lib/utils"
import { getQuestionData } from "@/lib/utils/question-helpers"
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
    currentQuestionId,
    handleAnswerSelect,
    setCurrentQuestionId,
    isCategoryCompleted,
    isLastCategory,
    moveToNextCategory,
  } = useTestAttempt()

  const questions = currentCategory.questions
  const totalQuestions = questions.length
  const answeredQuestions = questions.filter(q => 
    getQuestionData(q).isAnswered
  ).length

  const currentQuestionIndex = questions.findIndex(q => 
    getQuestionData(q).id === currentQuestionId
  )

  // Auto-advance to next category when current is completed
  useEffect(() => {
    if (isCategoryCompleted && !isLastCategory) {
      // Add a small delay before category transition
      const timer = setTimeout(() => {
        moveToNextCategory()
      }, 1000) // 1 second delay
      
      return () => clearTimeout(timer)
    }
  }, [isCategoryCompleted, isLastCategory, moveToNextCategory])

  // Handle question navigation
  const handleNext = () => {
    const nextQuestion = questions[currentQuestionIndex + 1]
    if (nextQuestion) {
      setCurrentQuestionId(getQuestionData(nextQuestion).id)
    }
  }

  const handlePrevious = () => {
    const prevQuestion = questions[currentQuestionIndex - 1]
    if (prevQuestion) {
      setCurrentQuestionId(getQuestionData(prevQuestion).id)
    }
  }

  return (
    <>
      <main className="space-y-6 mb-20">
        {questions.map((question, index) => {
          const questionData = getQuestionData(question)
          
          return (
            <QuestionCard
              key={questionData.id}
              question={{
                id: questionData.id,
                title: questionData.title,
                options: questionData.options
              }}
              questionNumber={index + 1}
              selectedOption={question.selectedOptionId || undefined}
              isAnswered={questionData.isAnswered}
              onAnswerSelect={(optionId) => handleAnswerSelect(questionData.id, optionId)}
              className={cn(
                "transition-all duration-200",
                questionData.id === currentQuestionId 
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
          currentQuestionNumber={currentQuestionIndex + 1}
          totalQuestions={totalQuestions}
          answeredQuestions={answeredQuestions}
          canGoNext={currentQuestionIndex < questions.length - 1}
          canGoPrevious={currentQuestionIndex > 0}
          onNext={handleNext}
          onPrevious={handlePrevious}
        />
      </div>
    </>
  )
}