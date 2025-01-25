"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { toast } from "sonner"
import { guestStorage } from "@/lib/storage/guest-storage"
import type { GuestAttemptSummary } from "@/types/tests/guest-attempt"
import type { GuestTestAttemptData } from "@/types/tests/test-attempt"

interface StartTestButtonProps {
  testId: string
  disabled?: boolean
  isAuthenticated?: boolean
  existingAttempt?: GuestAttemptSummary
}

export function StartTestButton({ 
  testId, 
  disabled,
  isAuthenticated = false,
  existingAttempt
}: StartTestButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [showDialog, setShowDialog] = useState(false)
  const router = useRouter()

  const handleStartNewAttempt = async () => {
    try {
      setIsLoading(true)
      setShowDialog(false)

      let guestData = null
      const endpoint = isAuthenticated 
        ? "/api/tests/attempt"
        : "/api/tests/guest/attempt"

      if (!isAuthenticated) {
        guestData = guestStorage.initGuest()
      }

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          testId,
          guestId: guestData?.guestId
        })
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Failed to start test")
      }

      const data = await response.json()

      if (!isAuthenticated && guestData) {
        const guestAttemptData: GuestTestAttemptData = {
          attemptId: data.guestAttempt.id,
          testId: data.guestAttempt.testId,
          guestId: guestData.guestId,
          startedAt: Date.now(),
          status: "IN_PROGRESS",
          responses: [],
          categoryScores: []
        }
        guestStorage.saveAttempt(guestAttemptData)
      }

      const attemptId = isAuthenticated ? data.testAttempt.id : data.guestAttempt.id
      router.push(`/tests/${testId}/attempt/${attemptId}`)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to start test")
    } finally {
      setIsLoading(false)
    }
  }

  const handleClick = () => {
    if (existingAttempt) {
      setShowDialog(true)
    } else {
      handleStartNewAttempt()
    }
  }

  return (
    <>
      <Button 
        onClick={handleClick} 
        disabled={disabled || isLoading}
        className="w-full"
      >
        {isLoading ? "Starting..." : existingAttempt ? "Resume or Start New" : "Start Test"}
        {!isAuthenticated && <span className="ml-2 text-xs">(Guest Mode)</span>}
      </Button>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>You have an incomplete attempt</DialogTitle>
            <DialogDescription>
              Would you like to continue your existing attempt or start a new one?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => {
                router.push(`/tests/${testId}/attempt/${existingAttempt?.id}`)
              }}
            >
              Continue Existing
            </Button>
            <Button onClick={handleStartNewAttempt}>
              Start New
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}