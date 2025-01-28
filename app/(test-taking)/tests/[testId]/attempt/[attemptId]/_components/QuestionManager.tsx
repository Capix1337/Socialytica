"use client"

// import { useEffect } from "react"
import { useTestAttempt } from "./TestAttemptContext"
import { QuestionCard } from "./QuestionCard"
// import { NavigationControls } from "./NavigationControls"
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
    currentQuestionId,
    handleAnswerSelect,
    setCurrentQuestionId,
  } = useTestAttempt()

  const questions = currentCategory.questions

  const handleAnswerAndScroll = async (questionId: string, optionId: string) => {
    await handleAnswerSelect(questionId, optionId)
    
    const currentIndex = questions.findIndex(q => getQuestionData(q).id === questionId)
    if (currentIndex < questions.length - 1) {
      const nextQuestion = questions[currentIndex + 1]
      const nextQuestionId = getQuestionData(nextQuestion).id
      
      const nextElement = document.getElementById(`question-${currentIndex + 2}`)
      if (nextElement) {
        nextElement.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        })
        
        setTimeout(() => {
          setCurrentQuestionId(nextQuestionId)
        }, 100)
      }
    }
  }

  return (
    <div className="relative">
      <main className="space-y-24">
        {questions.map((question, index) => {
          const questionData = getQuestionData(question)
          const isActive = questionData.id === currentQuestionId
          
          return (
            <div
              key={questionData.id}
              id={`question-${index + 1}`}
              className={cn(
                "transition-all duration-300",
                "scroll-mt-40",
                isActive 
                  ? "opacity-100 scale-100" 
                  : "opacity-30 blur-[1px] scale-98"
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
                  isActive && "ring-2 ring-primary shadow-lg"
                )}
              />
            </div>
          )
        })}
      </main>

      {/* Navigation Controls */}
    </div>
  )
}