"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { guestStorage } from "@/lib/storage/guest-storage"
import type { TestAttemptApiResponse, GuestTestAttemptData } from "@/types/tests/test-attempt"

interface StartTestButtonProps {
  testId: string;
  disabled?: boolean;
  isAuthenticated?: boolean;
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

      const guestData = !isAuthenticated ? guestStorage.initGuest() : null;
      
      const requestData: GuestTestAttemptData = {
        testId,
        isGuest: !isAuthenticated,
        ...(guestData && { guestId: guestData.guestId })
      };

      const response = await fetch("/api/tests/attempt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData)
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
          guestId: guestData!.guestId, // Include the guestId
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