"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { guestStorage } from "@/lib/storage/guest-storage"
import type { TestAttemptApiResponse } from "@/types/tests/test-attempt"

interface StartTestButtonProps {
  testId: string
  disabled?: boolean
  isAuthenticated?: boolean // New prop for auth state
}

export function StartTestButton({ 
  testId, 
  disabled,
  isAuthenticated = false // Default to guest mode if not specified
}: StartTestButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const startTest = async () => {
    try {
      setIsLoading(true)

      let guestId: string | undefined;

      // Initialize guest storage if not authenticated
      if (!isAuthenticated) {
        // Get or create guest data
        const guestData = guestStorage.initGuest();
        guestId = guestData.guestId;
      }

      // Call the test attempt endpoint with guest info if needed
      const response = await fetch("/api/tests/attempt", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ 
          testId,
          isGuest: !isAuthenticated,
          guestId // Include guestId if in guest mode
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to start test");
      }

      const data: TestAttemptApiResponse = await response.json();

      // Store attempt data in localStorage if guest mode
      if (!isAuthenticated) {
        guestStorage.saveAttempt({
          attemptId: data.testAttempt.id,
          testId: data.testAttempt.testId,
          startedAt: Date.now(),
          status: "IN_PROGRESS",
          responses: [],
          guestId: guestId!, // Include the guestId
        });
      }

      // Navigate to attempt page
      router.push(`/tests/${testId}/attempt/${data.testAttempt.id}`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to start test");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button 
      onClick={startTest} 
      disabled={disabled || isLoading}
      className="w-full"
    >
      {isLoading ? "Starting..." : "Start Test"}
      {!isAuthenticated && <span className="ml-2 text-xs">(Guest Mode)</span>}
    </Button>
  );
}