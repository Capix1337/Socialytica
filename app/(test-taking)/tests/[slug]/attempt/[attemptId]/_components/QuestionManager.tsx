"use client"

import { useEffect, useState } from "react"
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
  onError?: (error: Error) => void
}

export function QuestionManager({ currentCategory, onError }: QuestionManagerProps) {
  const {
    testId,
    attemptId,
    handleAnswerSelect,
    isCategoryCompleted,
    isLastCategory,
    moveToNextCategory,
  } = useTestAttempt()

  const questions = currentCategory.questions
  const totalQuestions = questions.length
  const answeredQuestions = questions.filter(q => 
    getQuestionData(q).isAnswered
  ).length

  const [currentQuestionId, setCurrentQuestionId] = useState<string>(() => 
    questions[0] ? getQuestionData(questions[0]).id : ''
  );

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

  // Add this helper function to normalize question IDs
  const normalizeQuestionId = (questionId: string) => {
    // Remove the attempt ID prefix if it exists (for non-guest users)
    return questionId.includes('_') ? questionId.split('_')[1] : questionId;
  };

  // Updated scroll and highlight function
  const scrollToNextQuestion = (currentIndex: number) => {
    requestAnimationFrame(() => {
      const nextQuestionElement = document.getElementById(`question-${currentIndex + 2}`);
      if (nextQuestionElement) {
        const headerOffset = 200;
        const elementPosition = nextQuestionElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        // Update current question ID before scrolling
        const nextQuestion = questions[currentIndex + 1];
        if (nextQuestion) {
          setCurrentQuestionId(getQuestionData(nextQuestion).id);
        }

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
    await handleOptionSelect(questionId, optionId);

    // Wait a tiny bit for the DOM to update
    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        scrollToNextQuestion(currentIndex);
      }
    }, 50);
  };

  const handleOptionSelect = async (questionId: string, optionId: string) => {
    try {
      await handleAnswerSelect(questionId, optionId)
    } catch (error) {
      // Call onError only if it's defined
      onError?.(error instanceof Error ? error : new Error('Failed to select answer'))
    }
  }

  // Add handler for card clicks
  const handleCardClick = (questionId: string) => {
    setCurrentQuestionId(questionId);
    // Smooth scroll to the clicked question
    const questionElement = document.getElementById(`question-${questionId}`);
    if (questionElement) {
      const headerOffset = 140;
      const elementPosition = questionElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <main className="container max-w-3xl mx-auto py-6 space-y-6">
        {questions.map((question, index) => {
          const questionData = getQuestionData(question)
          const isCurrentQuestion = normalizeQuestionId(questionData.id) === normalizeQuestionId(currentQuestionId)
          
          console.log('Question Debug:', {
            questionId: questionData.id,
            currentQuestionId,
            isCurrentQuestion,
            index
          });
          
          return (
            <QuestionCard
              id={`question-${index + 1}`}
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
              onClick={() => handleCardClick(questionData.id)} // Add click handler
              className={cn(
                "transition-all duration-300",
                isCurrentQuestion 
                  ? [
                    "bg-blue-50",
                    "ring-4",
                    "ring-blue-500",
                    "shadow-xl",
                    "relative",
                    "z-10",
                    "scale-[1.02]"
                  ] 
                  : [
                   "bg-white",
                    "opacity-60",
                    "blur-[2px]",
                    "filter",
                    "saturate-50",
                    "hover:opacity-80", // Add hover effect
                    "hover:blur-[1px]", // Reduce blur on hover
                    "cursor-pointer"    // Show pointer cursor
                  ]
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