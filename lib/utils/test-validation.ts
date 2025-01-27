// lib/utils/test-validation.ts

import type { TestAttemptQuestion } from "@/types/tests/test-attempt-question"
import type { GuestAttemptQuestion } from "@/types/tests/guest-attempt"

export interface CategoryProgress {
  total: number
  answered: number
  percentage: number
}

export interface TestValidationResult {
  totalQuestions: number
  answeredQuestions: number
  hasUnanswered: boolean
  categoriesProgress: Record<string, CategoryProgress>
}

export function validateTestAttempt(
  questions: (TestAttemptQuestion | GuestAttemptQuestion)[]
): TestValidationResult {
  const totalQuestions = questions.length
  const answeredQuestions = questions.filter(question => 
    'title' in question ? !!question.selectedOptionId : question.isAnswered
  ).length

  const categoriesProgress = questions.reduce((acc, question) => {
    const categoryName = 'title' in question 
      ? question.category?.name || "Uncategorized"
      : question.question.category?.name || "Uncategorized"

    if (!acc[categoryName]) {
      acc[categoryName] = { total: 0, answered: 0, percentage: 0 }
    }
    acc[categoryName].total++
    
    if ('title' in question ? !!question.selectedOptionId : question.isAnswered) {
      acc[categoryName].answered++
    }

    acc[categoryName].percentage = Math.round(
      (acc[categoryName].answered / acc[categoryName].total) * 100
    )

    return acc
  }, {} as Record<string, CategoryProgress>)

  return {
    totalQuestions,
    answeredQuestions,
    hasUnanswered: answeredQuestions < totalQuestions,
    categoriesProgress
  }
}