"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { guestStorage } from "@/lib/storage/guest-storage"
import type { GuestTestAttemptData } from "@/types/tests/test-attempt"

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
      setIsLoading(true);

      let guestData = null;
      // Determine the correct endpoint based on auth status
      const endpoint = isAuthenticated 
        ? "/api/tests/attempt"
        : "/api/tests/guest/attempt";

      if (!isAuthenticated) {
        guestData = guestStorage.initGuest();
      }

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          testId,
          guestId: guestData?.guestId
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to start test");
      }

      const data = await response.json();
      
      // Store attempt data in localStorage if guest mode
      if (!isAuthenticated && guestData) {
        const guestAttemptData: GuestTestAttemptData = {
          attemptId: data.guestAttempt.id, // Note: Changed from data.testAttempt to data.guestAttempt
          testId: data.guestAttempt.testId,
          guestId: guestData.guestId,
          startedAt: Date.now(),
          status: "IN_PROGRESS",
          responses: [],
          categoryScores: []
        };
        guestStorage.saveAttempt(guestAttemptData);
      }

      // Use the correct ID from the response
      const attemptId = isAuthenticated ? data.testAttempt.id : data.guestAttempt.id;
      router.push(`/tests/${testId}/attempt/${attemptId}`);
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