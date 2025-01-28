"use client"

// import { useEffect } from "react"
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
  } = useTestAttempt()

  const questions = currentCategory.questions
  const currentQuestionIndex = questions.findIndex(q => 
    getQuestionData(q).id === currentQuestionId
  )

  const handleAnswerAndScroll = async (questionId: string, optionId: string) => {
    await handleAnswerSelect(questionId, optionId)
    
    // Find next question index
    const currentIndex = questions.findIndex(q => getQuestionData(q).id === questionId)
    if (currentIndex < questions.length - 1) {
      const nextQuestion = questions[currentIndex + 1]
      setCurrentQuestionId(getQuestionData(nextQuestion).id)
      
      // Scroll to next question with animation
      setTimeout(() => {
        const nextElement = document.getElementById(`question-${currentIndex + 2}`)
        if (nextElement) {
          nextElement.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          })
        }
      }, 150) // Slight delay for smooth transition
    }
  }

  return (
    <div className="relative">
      <main className="space-y-24"> {/* Increased spacing between questions */}
        {questions.map((question, index) => {
          const questionData = getQuestionData(question)
          const isActive = questionData.id === currentQuestionId
          const distance = Math.abs(index - currentQuestionIndex)
          
          return (
            <div
              key={questionData.id}
              className={cn(
                "transition-all duration-500",
                "scroll-mt-40", // Offset for header
                isActive 
                  ? "opacity-100 scale-100 transform-none"
                  : cn(
                      "scale-95",
                      distance === 1 
                        ? "opacity-30 blur-[1px]" 
                        : "opacity-20 blur-[2px]"
                    )
              )}
            >
              <QuestionCard
                question={{
                  id: questionData.id,
                  title: questionData.title,
                  options: questionData.options
                }}
                questionNumber={index + 1}
                selectedOption={question.selectedOptionId || undefined}
                isAnswered={questionData.isAnswered}
                onAnswerSelect={(optionId) => handleAnswerAndScroll(questionData.id, optionId)}
                className={cn(
                  "transition-all duration-300",
                  isActive && "ring-2 ring-primary shadow-lg"
                )}
              />
            </div>
          )
        })}
      </main>

      <div className="sticky bottom-0 mt-6 bg-background border-t">
        <NavigationControls
          testId={testId}
          attemptId={attemptId}
          currentQuestionNumber={currentQuestionIndex + 1}
          totalQuestions={questions.length}
          answeredQuestions={questions.filter(q => getQuestionData(q).isAnswered).length}
          canGoNext={currentQuestionIndex < questions.length - 1}
          canGoPrevious={currentQuestionIndex > 0}
          onNext={() => {
            const nextQuestion = questions[currentQuestionIndex + 1]
            if (nextQuestion) {
              setCurrentQuestionId(getQuestionData(nextQuestion).id)
            }
          }}
          onPrevious={() => {
            const prevQuestion = questions[currentQuestionIndex - 1]
            if (prevQuestion) {
              setCurrentQuestionId(getQuestionData(prevQuestion).id)
            }
          }}
        />
      </div>
    </div>
  )
}