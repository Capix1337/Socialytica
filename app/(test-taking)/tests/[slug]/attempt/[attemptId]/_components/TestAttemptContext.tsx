// app/(test-taking)/tests/[testId]/attempt/[attemptId]/_components/TestAttemptContext.tsx
"use client"

import { createContext, useContext, useState, useCallback, useEffect } from "react"
import { useAuth } from "@clerk/nextjs"
import { toast } from "sonner" // Add this import
import { guestStorage } from "@/lib/storage/guest-storage"
import { isGuestQuestion } from "@/lib/utils/question-helpers"
import type { TestAttemptQuestion } from "@/types/tests/test-attempt-question"
import type { GuestAttemptQuestion } from "@/types/tests/guest-attempt"
import type { GuestCategoryProgress } from "@/lib/storage/guest-storage" // Add this import

export interface CategoryState {
  id: string
  name: string
  isCompleted: boolean
  questions: (TestAttemptQuestion | GuestAttemptQuestion)[]
}

const getQuestionId = (question: TestAttemptQuestion | GuestAttemptQuestion): string => {
  return isGuestQuestion(question) ? question.id : question.questionId
}

interface TestAttemptContextType {
  testId: string
  attemptId: string
  questions: (TestAttemptQuestion | GuestAttemptQuestion)[]
  currentQuestionId: string
  currentCategory: CategoryState | null
  nextCategory: CategoryState | null // Add this line
  categories: CategoryState[]
  isLoading: boolean
  showCompletionDialog: boolean
  setShowCompletionDialog: (show: boolean) => void
  handleAnswerSelect: (questionId: string, optionId: string) => Promise<void>
  setCurrentQuestionId: (id: string) => void
  moveToNextCategory: () => void
  isCategoryCompleted: boolean
  isLastCategory: boolean
}

export const TestAttemptContext = createContext<TestAttemptContextType | undefined>(undefined)

export function useTestAttempt() {
  const context = useContext(TestAttemptContext)
  if (!context) {
    throw new Error("useTestAttempt must be used within a TestAttemptProvider")
  }
  return context
}

interface TestAttemptProviderProps {
  children: React.ReactNode
  params: Promise<{ testId: string; attemptId: string }>
}

// Remove dialog-related state
export function TestAttemptProvider({ children, params }: TestAttemptProviderProps) {
  const { isSignedIn } = useAuth()
  const [questions, setQuestions] = useState<(TestAttemptQuestion | GuestAttemptQuestion)[]>([])
  const [currentQuestionId, setCurrentQuestionId] = useState<string>("")
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0)
  const [categories, setCategories] = useState<CategoryState[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [attemptId, setAttemptId] = useState<string>("")
  const [testId, setTestId] = useState<string>("")
  const [showCompletionDialog, setShowCompletionDialog] = useState(false) // Add this line

  // Get current category and completion status
  const currentCategory = categories[currentCategoryIndex] || null
  const nextCategory = categories[currentCategoryIndex + 1] || null // Add this line
  const isCategoryCompleted = currentCategory?.questions.every(q => 
    isGuestQuestion(q) ? !!q.selectedOptionId : q.isAnswered
  ) || false
  const isLastCategory = currentCategoryIndex === categories.length - 1

  // Save progress including category state
  const saveProgress = useCallback(() => {
    if (!isSignedIn && attemptId) {
      const progress: GuestCategoryProgress = {
        currentCategoryIndex,
        completedCategories: categories
          .filter(cat => cat.questions.every(q => 
            isGuestQuestion(q) ? !!q.selectedOptionId : q.isAnswered
          ))
          .map(cat => cat.id),
        lastUpdated: Date.now(), // Add timestamp
        categoryTransitions: [], // Initialize empty transitions array
      }
      guestStorage.saveAttemptProgress(attemptId, progress)
    }
  }, [isSignedIn, attemptId, currentCategoryIndex, categories])

  // Updated scroll helper function
  const scrollToFirstQuestion = useCallback(() => {
    // Reset scroll position to top immediately
    window.scrollTo(0, 0);
    
    // Wait for next category to be rendered
    setTimeout(() => {
      const firstQuestionElement = document.querySelector(`[id^="question-"]`);
      if (firstQuestionElement) {
        const headerOffset = 200;
        firstQuestionElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        
        // Fine-tune the scroll position
        window.scrollBy({
          top: -headerOffset,
          behavior: 'smooth'
        });
      }
    }, 100);
  }, []);

  // Modified handleNextCategory function
  const handleNextCategory = useCallback(() => {
    if (isCategoryCompleted && !isLastCategory) {
      // Record transition and update state
      if (currentCategory) {
        const nextCat = categories[currentCategoryIndex + 1];
        if (nextCat) {
          if (!isSignedIn) {
            guestStorage.recordCategoryTransition(
              attemptId,
              currentCategory.id,
              nextCat.id
            );
          }
          
          // First scroll to top
          window.scrollTo(0, 0);
          
          // Then update state
          setCurrentCategoryIndex(prev => prev + 1);
          
          // Set first question of next category
          const firstQuestion = nextCat.questions[0];
          if (firstQuestion) {
            const questionId = getQuestionId(firstQuestion);
            setCurrentQuestionId(questionId);
            
            // Scroll to first question after state update
            setTimeout(scrollToFirstQuestion, 100);
          }
        }
      }
    }
  }, [
    isCategoryCompleted,
    isLastCategory,
    categories,
    currentCategoryIndex,
    currentCategory,
    isSignedIn,
    attemptId,
    scrollToFirstQuestion
  ]);

  // Resume functionality
  const resumeProgress = useCallback(() => {
    if (!isSignedIn && attemptId) {
      const savedProgress = guestStorage.getAttemptProgress(attemptId)
      if (savedProgress) {
        setCurrentCategoryIndex(savedProgress.currentCategoryIndex)
        // Remove reference to categoryOrder
        setCategories(prev => {
          // Mark categories as completed based on saved completedCategories
          return prev.map(category => ({
            ...category,
            isCompleted: savedProgress.completedCategories.includes(category.id)
          }))
        })
      }
    }
  }, [isSignedIn, attemptId])

  // Initialize categories from questions with order preservation
  const initializeCategories = useCallback((questions: (TestAttemptQuestion | GuestAttemptQuestion)[]) => {
    const categorizedQuestions = questions.reduce((acc, question) => {
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
          isCompleted: false,
          questions: []
        }
      }
      acc[categoryId].questions.push(question)
      return acc
    }, {} as Record<string, CategoryState>)

    const sortedCategories = Object.values(categorizedQuestions)
    setCategories(sortedCategories)
    
    // Set initial question
    if (sortedCategories.length && sortedCategories[0].questions.length) {
      setCurrentQuestionId(sortedCategories[0].questions[0].id)
    }
  }, [])

  // Fetch questions
  const fetchQuestions = useCallback(async () => {
    if (!attemptId || !testId) return // Add testId check

    try {
      setIsLoading(true)
      const endpoint = isSignedIn 
        ? `/api/tests/${testId}/attempt/${attemptId}/questions` // Updated path
        : `/api/tests/${testId}/guest/attempt/${attemptId}/questions` // Updated path

      const response = await fetch(endpoint)
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || `Failed to fetch questions: ${response.status}`)
      }

      const data = await response.json()
      if (!data.questions) {
        throw new Error('No questions data received')
      }

      setQuestions(data.questions)
      initializeCategories(data.questions)
    } catch (error) {
      console.error("Failed to load questions:", error)
      toast.error("Failed to load questions. Please try refreshing the page.")
    } finally {
      setIsLoading(false)
    }
  }, [attemptId, testId, isSignedIn, initializeCategories]) // Add testId to dependencies

  // Handle answer selection
  const handleAnswerSelect = useCallback(async (questionId: string, optionId: string) => {
    try {
      const endpoint = isSignedIn 
        ? `/api/tests/attempt/${attemptId}/questions`
        : `/api/tests/guest/attempt/${attemptId}/questions`

      const response = await fetch(endpoint, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questionId, selectedOptionId: optionId })
      })

      if (!response.ok) throw new Error('Failed to submit answer')

      const data = await response.json()

      // Update guest storage if needed
      if (!isSignedIn && data.success) {
        guestStorage.saveGuestResponse(attemptId, questionId, optionId, data.pointsEarned, data.maxPoints)
      }

      // Update questions state
      setQuestions(prev => prev.map(q => {
        if (getQuestionId(q) === questionId) {
          return { ...q, selectedOptionId: optionId, isAnswered: !isGuestQuestion(q) }
        }
        return q
      }))

      // Check if category is completed after answer
      const updatedCategory = categories[currentCategoryIndex]
      const categoryComplete = updatedCategory.questions.every(q => 
        isGuestQuestion(q) ? !!q.selectedOptionId : q.isAnswered
      )

      if (categoryComplete && !isLastCategory) {
        handleNextCategory()
      }

    } catch (error) {
      console.error("Error saving answer:", error)
    }
  }, [attemptId, isSignedIn, categories, currentCategoryIndex, isLastCategory, handleNextCategory])

  // Initialize params
  useEffect(() => {
    params.then(resolvedParams => {
      setAttemptId(resolvedParams.attemptId)
      setTestId(resolvedParams.testId)
    })
  }, [params])

  // Fetch questions when attemptId is available
  useEffect(() => {
    if (attemptId && testId) { // Check for both
      fetchQuestions()
    }
  }, [attemptId, testId, fetchQuestions])

  // Effect to save progress on changes
  useEffect(() => {
    saveProgress()
  }, [saveProgress, questions, currentCategoryIndex])

  // Effect to resume progress on mount
  useEffect(() => {
    if (attemptId) {
      resumeProgress()
    }
  }, [attemptId, resumeProgress])

  const value = {
    testId,
    attemptId,
    questions,
    currentQuestionId,
    currentCategory,
    nextCategory, // Add this line
    categories,
    isLoading,
    showCompletionDialog,        // Now properly declared
    setShowCompletionDialog,     // Now properly declared
    handleAnswerSelect,
    setCurrentQuestionId,
    moveToNextCategory: handleNextCategory,
    isCategoryCompleted,  
    isLastCategory
  }

  return (
    <TestAttemptContext.Provider value={value}>
      {children}
    </TestAttemptContext.Provider>
  )
}

