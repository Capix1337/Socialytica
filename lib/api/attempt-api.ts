// lib/api/attempt-api.ts

import { debounce } from "lodash"
import type { SubmitAnswerResponse } from "@/types/tests/test-attempt-question"

interface BatchAnswer {
  questionId: string
  selectedOptionId: string
  timestamp: number
}

interface BatchUpdatePayload {
  answers: BatchAnswer[]
}

class AttemptApi {
  private batchTimeout = 2000 // 2 seconds
  private maxBatchSize = 5
  private pendingAnswers: Map<string, BatchAnswer[]> = new Map()

  private processBatch = async (attemptId: string) => {
    const answers = this.pendingAnswers.get(attemptId) || []
    if (answers.length === 0) return

    try {
      const payload: BatchUpdatePayload = {
        answers: answers.sort((a, b) => a.timestamp - b.timestamp)
      }

      // Only send batch request when we have enough answers or timeout occurs
      if (answers.length >= this.maxBatchSize || this.shouldProcessBatch) {
        const response = await fetch(`/api/tests/attempt/${attemptId}/questions/batch`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        })

        if (!response.ok) {
          throw new Error('Failed to submit batch answers')
        }

        // Clear processed answers only on success
        this.pendingAnswers.delete(attemptId)
      }
    } catch (error) {
      console.error('Batch update failed:', error)
      // Keep answers in queue for retry
    }
  }

  // Add property to track last batch process time
  private lastBatchTime: number = Date.now()
  private get shouldProcessBatch(): boolean {
    const now = Date.now()
    if (now - this.lastBatchTime >= this.batchTimeout) {
      this.lastBatchTime = now
      return true
    }
    return false
  }

  private debouncedProcess = debounce(this.processBatch, this.batchTimeout)

  public async submitAnswer(
    attemptId: string,
    questionId: string,
    selectedOptionId: string
  ): Promise<SubmitAnswerResponse> {
    try {
      // Immediately submit single answer for real-time feedback
      const response = await fetch(`/api/tests/attempt/${attemptId}/questions`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questionId, selectedOptionId })
      })

      if (!response.ok) {
        throw new Error('Failed to submit answer')
      }

      return await response.json()
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to submit answer'
      }
    }
  }

  public queueBatchAnswer(
    attemptId: string,
    questionId: string,
    selectedOptionId: string
  ): void {
    const answers = this.pendingAnswers.get(attemptId) || []
    
    // Add new answer
    answers.push({
      questionId,
      selectedOptionId,
      timestamp: Date.now()
    })

    // Update pending answers
    this.pendingAnswers.set(attemptId, answers)

    // Only process if we hit batch size or timeout
    if (answers.length >= this.maxBatchSize || this.shouldProcessBatch) {
      this.processBatch(attemptId)
    }
  }
}

export const attemptApi = new AttemptApi()
