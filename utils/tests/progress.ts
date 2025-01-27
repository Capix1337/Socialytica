import type { TestProgress, TestScore } from '@/types/tests/progress'
import type { QuestionResponse } from '@/types/tests/test-attempt'

export const calculateProgress = (
  responses: QuestionResponse[], 
  totalQuestions: number
): TestProgress => {
  const answeredQuestions = responses.length
  
  return {
    answeredQuestions,
    totalQuestions,
    percentageComplete: totalQuestions > 0 
      ? Math.round((answeredQuestions / totalQuestions) * 100)
      : 0
  }
}

export const calculateScore = (
  responses: QuestionResponse[]
): TestScore => {
  const totalScore = responses.reduce((sum, response) => sum + response.pointsEarned, 0)
  const maxScore = responses.reduce((sum, response) => sum + response.maxPoints, 0)
  
  return {
    totalScore,
    percentageScore: maxScore > 0 
      ? Math.round((totalScore / maxScore) * 100)
      : 0
  }
}