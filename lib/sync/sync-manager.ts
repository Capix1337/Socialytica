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

  private async syncBatch(attemptId: string, tasks: SyncTask[]): Promise<void> {
    try {
      const endpoint = `/api/tests/attempt/${attemptId}/questions/batch`
      const response = await fetch(endpoint, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers: tasks })
      })

      if (!response.ok) throw new Error('Sync failed')

      // Mark synced in storage
      tasks.forEach(task => {
        attemptStorage.markAnswerSynced(attemptId, task.questionId)
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