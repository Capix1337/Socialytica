// lib/storage/attempt-storage.ts

import type { TestAttemptQuestion } from "@/types/tests/test-attempt-question"
import type { GuestAttemptQuestion } from "@/types/tests/guest-attempt"

interface StoredAnswer {
  questionId: string
  selectedOptionId: string
  timestamp: number
  synced: boolean
  retryCount: number
}

interface AttemptCache {
  attemptId: string
  answers: StoredAnswer[]
  lastUpdated: number
  version: number
}

export class AttemptStorage {
  private static CACHE_KEY = 'test_attempt_cache'
  private static MAX_CACHE_AGE = 24 * 60 * 60 * 1000 // 24 hours
  private static MAX_RETRY_COUNT = 3

  private isClient = typeof window !== 'undefined'

  public async saveAnswers(
    attemptId: string, 
    questions: (TestAttemptQuestion | GuestAttemptQuestion)[]
  ): Promise<void> {
    if (!this.isClient) return

    try {
      const cache = this.getCache(attemptId)
      const answers: StoredAnswer[] = questions
        .filter(q => {
          if ('questionId' in q) {
            return q.selectedOptionId && q.isAnswered
          }
          return q.selectedOptionId
        })
        .map(q => ({
          questionId: 'questionId' in q ? q.questionId : q.id,
          selectedOptionId: q.selectedOptionId!,
          timestamp: Date.now(),
          synced: false,
          retryCount: 0
        }))

      cache.answers = answers
      cache.lastUpdated = Date.now()
      this.saveCache(attemptId, cache)
    } catch (error) {
      console.error('Failed to save answers:', error)
      throw new Error('Failed to save answers to local storage')
    }
  }

  public cacheAnswer(
    attemptId: string, 
    questionId: string, 
    selectedOptionId: string
  ): void {
    if (!this.isClient) return

    try {
      const cache = this.getCache(attemptId)
      const answer: StoredAnswer = {
        questionId,
        selectedOptionId,
        timestamp: Date.now(),
        synced: false,
        retryCount: 0
      }

      // Update existing answer or add new one
      const existingIndex = cache.answers.findIndex(a => a.questionId === questionId)
      if (existingIndex >= 0) {
        cache.answers[existingIndex] = answer
      } else {
        cache.answers.push(answer)
      }

      cache.lastUpdated = Date.now()
      this.saveCache(attemptId, cache)
    } catch (error) {
      console.error('Failed to cache answer:', error)
    }
  }

  public markAnswerSynced(attemptId: string, questionId: string): void {
    if (!this.isClient) return

    try {
      const cache = this.getCache(attemptId)
      const answer = cache.answers.find(a => a.questionId === questionId)
      if (answer) {
        answer.synced = true
        this.saveCache(attemptId, cache)
      }
    } catch (error) {
      console.error('Failed to mark answer as synced:', error)
    }
  }

  public getUnsynced(attemptId: string): StoredAnswer[] {
    if (!this.isClient) return []

    try {
      const cache = this.getCache(attemptId)
      return cache.answers.filter(a => !a.synced && a.retryCount < AttemptStorage.MAX_RETRY_COUNT)
    } catch (error) {
      console.error('Failed to get unsynced answers:', error)
      return []
    }
  }

  private getCache(attemptId: string): AttemptCache {
    const key = `${AttemptStorage.CACHE_KEY}_${attemptId}`
    const cached = localStorage.getItem(key)
    
    if (cached) {
      const parsed = JSON.parse(cached)
      if (Date.now() - parsed.lastUpdated < AttemptStorage.MAX_CACHE_AGE) {
        return parsed
      }
    }

    return {
      attemptId,
      answers: [],
      lastUpdated: Date.now(),
      version: 1
    }
  }

  private saveCache(attemptId: string, cache: AttemptCache): void {
    const key = `${AttemptStorage.CACHE_KEY}_${attemptId}`
    localStorage.setItem(key, JSON.stringify(cache))
  }
}

export const attemptStorage = new AttemptStorage()