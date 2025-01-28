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

  // Updated scroll function with better timing and smoothness
  const scrollToNextQuestion = (currentIndex: number) => {
    requestAnimationFrame(() => {
      const nextQuestionElement = document.getElementById(`question-${currentIndex + 2}`);
      if (nextQuestionElement) {
        const headerOffset = 200;
        const elementPosition = nextQuestionElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  };

  // Modified answer selection handler
  const handleQuestionAnswer = async (questionId: string, optionId: string) => {
    const currentIndex = questions.findIndex(q => getQuestionData(q).id === questionId);
    
    // Handle the answer selection
    await handleAnswerSelect(questionId, optionId);

    // Wait a tiny bit for the DOM to update
    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        scrollToNextQuestion(currentIndex);
      }
    }, 50);
  };

  return (
    <>
      <main className="space-y-6 mb-20">
        {questions.map((question, index) => {
          const questionData = getQuestionData(question)
          
          return (
            <QuestionCard
              id={`question-${index + 1}`} // Add this ID attribute
              key={questionData.id}
              question={{
                id: questionData.id,
                title: questionData.title,
                options: questionData.options
              }}
              questionNumber={index + 1}
              selectedOption={question.selectedOptionId || undefined}
              isAnswered={questionData.isAnswered}
              onAnswerSelect={(optionId) => handleQuestionAnswer(questionData.id, optionId)}
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