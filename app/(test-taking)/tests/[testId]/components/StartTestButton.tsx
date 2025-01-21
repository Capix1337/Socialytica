"use client"

import { useState } from "react" // Remove useEffect
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { guestStorage } from "@/lib/storage/guest-storage"
import type { TestAttemptApiResponse } from "@/types/tests/test-attempt"

interface StartTestButtonProps {
  testId: string
  disabled?: boolean
  isAuthenticated?: boolean
}

export function StartTestButton({ 
  testId, 
  disabled,
  isAuthenticated = false
}: StartTestButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const startTest = async () => {
    try {
      setIsLoading(true)

      let guestId: string | undefined

      // Initialize guest storage if not authenticated
      if (!isAuthenticated) {
        const guestData = guestStorage.initGuest()
        guestId = guestData.guestId
      }

      const response = await fetch("/api/tests/attempt", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ 
          testId,
          isGuest: !isAuthenticated,
          guestId
        })
      })

      if (!response.ok) {
        throw new Error("Failed to start test")
      }

      const data: TestAttemptApiResponse = await response.json()

      // Store attempt data if guest
      if (!isAuthenticated) {
        guestStorage.saveAttempt({
          attemptId: data.testAttempt.id,
          testId: data.testAttempt.testId,
          startedAt: Date.now(), // Fix: Use timestamp instead of Date object
          status: "IN_PROGRESS",
          responses: []
        })
      }

      router.push(`/tests/${testId}/attempt/${data.testAttempt.id}`)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to start test")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button 
      onClick={startTest} 
      disabled={disabled || isLoading}
      className="w-full"
    >
      {isLoading ? "Starting..." : "Start Test"}
    </Button>
  )
}