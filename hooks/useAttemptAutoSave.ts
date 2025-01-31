// hooks/useAttemptAutoSave.ts
import { useState, useEffect, useCallback } from 'react'
import { useIdleTimer } from 'react-idle-timer'

export function useAttemptAutoSave(attemptId: string) {
  const [pendingChanges, setPendingChanges] = useState<Answer[]>([])
  const [lastSaved, setLastSaved] = useState<Date | null>(null)

  const syncChanges = useCallback(async () => {
    if (pendingChanges.length === 0) return
    
    try {
      await attemptIndexedDB.saveAnswers(attemptId, pendingChanges)
      setLastSaved(new Date())
      setPendingChanges([])
    } catch (error) {
      console.error('Failed to sync changes:', error)
    }
  }, [attemptId, pendingChanges])

  useEffect(() => {
    if (pendingChanges.length >= 5) {
      syncChanges()
    }
  }, [pendingChanges, syncChanges])

  useIdleTimer({
    timeout: 30000,
    onIdle: syncChanges
  })

  return {
    addChange: useCallback((answer: Answer) => {
      setPendingChanges(prev => [...prev, answer])
    }, []),
    syncChanges,
    pendingChanges,
    lastSaved
  }
}