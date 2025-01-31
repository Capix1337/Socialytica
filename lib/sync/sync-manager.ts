// lib/sync/sync-manager.ts

import { attemptStorage } from "@/lib/storage/attempt-storage"

interface SyncTask {
  attemptId: string
  questionId: string
  selectedOptionId: string
  timestamp: number
}

export class SyncManager {
  private syncQueue: SyncTask[] = []
  private isSyncing = false
  private readonly BATCH_SIZE = 5
  private readonly SYNC_INTERVAL = 5000 // 5 seconds
  private syncPromises: Map<string, Promise<void>> = new Map() // Add this line

  constructor() {
    if (typeof window !== 'undefined') {
      // Start periodic sync
      setInterval(() => this.processSyncQueue(), this.SYNC_INTERVAL)
    }
  }

  public queueSync(task: SyncTask): void {
    this.syncQueue.push(task)
    this.processSyncQueue()
  }

  private async processSyncQueue(): Promise<void> {
    if (this.isSyncing || this.syncQueue.length === 0) return

    try {
      this.isSyncing = true
      const batch = this.syncQueue.slice(0, this.BATCH_SIZE)

      // Group by attempt ID for batch processing
      const attemptGroups = this.groupByAttemptId(batch)

      for (const [attemptId, tasks] of Object.entries(attemptGroups)) {
        await this.syncBatch(attemptId, tasks)
      }

      // Remove synced items from queue
      this.syncQueue = this.syncQueue.slice(batch.length)
    } catch (error) {
      console.error('Sync error:', error)
    } finally {
      this.isSyncing = false
    }
  }

  // Add this new method
  public async waitForSync(attemptId: string, questionId: string): Promise<void> {
    const key = `${attemptId}-${questionId}`
    const existingPromise = this.syncPromises.get(key)
    
    if (existingPromise) {
      return existingPromise
    }

    const promise = new Promise<void>((resolve) => {
      const checkSync = () => {
        const task = this.syncQueue.find(t => 
          t.attemptId === attemptId && t.questionId === questionId
        )

        if (!task) {
          this.syncPromises.delete(key)
          resolve()
        } else {
          setTimeout(checkSync, 500) // Check every 500ms
        }
      }

      checkSync()
    })

    this.syncPromises.set(key, promise)
    return promise
  }

  // Modify the existing syncBatch method to clean up promises
  private async syncBatch(attemptId: string, tasks: SyncTask[]): Promise<void> {
    try {
      const endpoint = `/api/tests/attempt/${attemptId}/questions/batch`
      const response = await fetch(endpoint, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers: tasks })
      })

      if (!response.ok) throw new Error('Sync failed')

      // Mark synced in storage and clean up promises
      tasks.forEach(task => {
        attemptStorage.markAnswerSynced(attemptId, task.questionId)
        const key = `${attemptId}-${task.questionId}`
        this.syncPromises.delete(key)
      })
    } catch (error) {
      console.error('Batch sync failed:', error)
      // Tasks will remain in queue for retry
    }
  }

  private groupByAttemptId(tasks: SyncTask[]): Record<string, SyncTask[]> {
    return tasks.reduce((groups, task) => {
      const group = groups[task.attemptId] || []
      group.push(task)
      groups[task.attemptId] = group
      return groups
    }, {} as Record<string, SyncTask[]>)
  }
}

export const syncManager = new SyncManager()