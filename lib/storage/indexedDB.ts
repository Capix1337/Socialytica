// lib/storage/indexedDB.ts

interface StoredAnswer {
  attemptId: string
  questionId: string
  selectedOptionId: string
  timestamp: number
  synced: boolean
}

interface AttemptMetadata {
  attemptId: string
  lastSyncTimestamp: number
  totalQuestions: number
  answeredQuestions: number
}

export class AttemptIndexedDB {
  private dbName = 'testAttempts'
  private version = 1

  async initDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version)
      
      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve(request.result)
      
      request.onupgradeneeded = () => {
        const db = request.result
        if (!db.objectStoreNames.contains('answers')) {
          db.createObjectStore('answers', { keyPath: ['attemptId', 'questionId'] })
        }
        if (!db.objectStoreNames.contains('metadata')) {
          db.createObjectStore('metadata', { keyPath: 'attemptId' })
        }
      }
    })
  }

  async saveAnswer(
    attemptId: string, 
    questionId: string, 
    answer: Pick<StoredAnswer, 'selectedOptionId'>
  ): Promise<IDBValidKey> {
    const db = await this.initDB()
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['answers'], 'readwrite')
      const store = transaction.objectStore('answers')
      
      const storedAnswer: StoredAnswer = {
        attemptId,
        questionId,
        selectedOptionId: answer.selectedOptionId,
        timestamp: Date.now(),
        synced: false
      }

      const request = store.put(storedAnswer)

      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve(request.result)
    })
  }

  // Add more methods for CRUD operations
  async getAnswer(attemptId: string, questionId: string): Promise<StoredAnswer | undefined> {
    const db = await this.initDB()
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['answers'], 'readonly')
      const store = transaction.objectStore('answers')
      const request = store.get([attemptId, questionId])

      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve(request.result)
    })
  }

  async updateMetadata(metadata: AttemptMetadata): Promise<void> {
    const db = await this.initDB()
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['metadata'], 'readwrite')
      const store = transaction.objectStore('metadata')
      const request = store.put(metadata)

      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve()
    })
  }

  async getMetadata(attemptId: string): Promise<AttemptMetadata | undefined> {
    const db = await this.initDB()
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['metadata'], 'readonly')
      const store = transaction.objectStore('metadata')
      const request = store.get(attemptId)

      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve(request.result)
    })
  }

  async getAllAnswers(attemptId: string): Promise<StoredAnswer[]> {
    const db = await this.initDB()
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['answers'], 'readonly')
      const store = transaction.objectStore('answers')
      const request = store.getAll()

      request.onerror = () => reject(request.error)
      request.onsuccess = () => {
        // Filter answers by attemptId
        const allAnswers = request.result as StoredAnswer[]
        const attemptAnswers = allAnswers.filter(answer => answer.attemptId === attemptId)
        resolve(attemptAnswers)
      }
    })
  }
}

export const attemptIndexedDB = new AttemptIndexedDB()