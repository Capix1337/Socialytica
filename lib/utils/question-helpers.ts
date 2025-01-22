// lib/utils/question-helpers.ts
import type { TestAttemptQuestion } from "@/types/tests/test-attempt-question"
import type { GuestAttemptQuestion } from "@/types/tests/guest-attempt"

export const isGuestQuestion = (
  question: TestAttemptQuestion | GuestAttemptQuestion
): question is GuestAttemptQuestion => {
  return 'title' in question
}

export const getCategoryId = (question: TestAttemptQuestion | GuestAttemptQuestion): string => {
  return isGuestQuestion(question) 
    ? question.category?.id || "uncategorized"
    : question.question.categoryId || "uncategorized"
}

export const getQuestionData = (question: TestAttemptQuestion | GuestAttemptQuestion) => {
  const isGuest = isGuestQuestion(question)
  return {
    id: isGuest ? question.id : question.questionId,
    title: isGuest ? question.title : question.question.title,
    categoryId: isGuest ? question.category?.id : question.question.categoryId,
    categoryName: isGuest ? question.category?.name : question.question.category?.name,
    options: isGuest ? question.options : question.question.options,
    isAnswered: isGuest ? !!question.selectedOptionId : question.isAnswered
  }
}