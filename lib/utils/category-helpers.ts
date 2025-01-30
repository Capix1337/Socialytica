// lib/utils/category-helpers.ts

import type { CategoryState } from "@/app/(test-taking)/tests/[slug]/attempt/[attemptId]/_components/TestAttemptContext"
import { isGuestQuestion } from "./question-helpers"

export function isCategoryCompleted(category: CategoryState): boolean {
  return category.questions.every(q => 
    isGuestQuestion(q) ? !!q.selectedOptionId : q.isAnswered
  )
}

export function getNextCategory(
  categories: CategoryState[], 
  currentIndex: number
): CategoryState | null {
  return categories[currentIndex + 1] || null
}

export function validateCategoryTransition(
  currentCategory: CategoryState | null,
  nextCategory: CategoryState | null
): boolean {
  if (!currentCategory || !nextCategory) return false
  return isCategoryCompleted(currentCategory)
}

export function getCategoryProgress(category: CategoryState): {
  answeredQuestions: number
  totalQuestions: number
  progress: number
} {
  const totalQuestions = category.questions.length
  const answeredQuestions = category.questions.filter(q => 
    isGuestQuestion(q) ? !!q.selectedOptionId : q.isAnswered
  ).length

  return {
    answeredQuestions,
    totalQuestions,
    progress: (answeredQuestions / totalQuestions) * 100
  }
}