"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useTestAttempt } from "./TestAttemptContext"
import { TestHeader } from "./TestHeader"
import { QuestionManager } from "./QuestionManager"
import { LoadingState } from "./LoadingState"
import { isGuestQuestion } from "@/lib/utils/question-helpers"
import { AttemptErrorCodes } from "@/lib/errors/attempt-errors" // Remove AttemptError import
import { ErrorRecoveryDialog } from './ErrorRecoveryDialog'
import { SaveDraftButton } from "@/components/SaveDraftButton"
// import { SyncStatus } from "@/components/SyncStatus"

export function TestAttemptLayout() {
  const router = useRouter()
  const {
    isLoading,
    questions,
    currentCategory,
    error,
    clearError,
    retryOperation,
    // pendingChanges,
    // lastSaved,
    handleSaveDraft,
    isSyncingDraft,
    pendingSyncQuestions
  } = useTestAttempt()

  useEffect(() => {
    if (error) {
      if (error.code === AttemptErrorCodes.SESSION_EXPIRED) {
        toast.error('Your session has expired. Please sign in again.')
        router.push('/sign-in')
        return
      }

      toast.error(error.message, {
        action: error.recoverable ? {
          label: 'Retry',
          onClick: retryOperation
        } : undefined
      })
    }
  }, [error, router, retryOperation])

  if (isLoading) return <LoadingState />

  if (error) {
    if (!error.recoverable) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2">Error</h2>
            <p className="text-gray-600 mb-4">{error.message}</p>
            <button
              onClick={() => router.push('/')}
              className="text-primary hover:underline"
            >
              Return to Home
            </button>
          </div>
        </div>
      )
    }

    return <ErrorRecoveryDialog error={error} onRetry={retryOperation} onDismiss={clearError} />
  }

  // Calculate total progress
  const totalQuestions = questions.length
  const answeredQuestions = questions.filter(q => 
    isGuestQuestion(q) ? !!q.selectedOptionId : q.isAnswered
  ).length

  // Add this to show sync status
  const syncStatus = pendingSyncQuestions.size > 0 
    ? `Syncing ${pendingSyncQuestions.size} answers...`
    : 'All changes synced'

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pb-24">
        <div className="sticky top-16 z-40 bg-gray-50">
          <TestHeader
            title="Test Taking"
            currentCategory={currentCategory?.name || ""}
            totalQuestions={totalQuestions}
            answeredQuestions={answeredQuestions}
          />
          <div className="container max-w-7xl mx-auto px-4 flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              {syncStatus}
            </div>
            <SaveDraftButton 
              onSave={handleSaveDraft}
              disabled={isSyncingDraft || pendingSyncQuestions.size > 0}
              loading={isSyncingDraft}
              pendingCount={pendingSyncQuestions.size} // Add the required prop
            />
          </div>
        </div>

        <div className="container max-w-7xl mx-auto px-4 mt-6">
          {currentCategory && (
            <QuestionManager 
              currentCategory={currentCategory}
              onError={(error) => {
                toast.error(error.message, {
                  action: {
                    label: 'Retry',
                    onClick: retryOperation
                  }
                })
              }}
            />
          )}
        </div>
      </div>
    </div>
  )
}