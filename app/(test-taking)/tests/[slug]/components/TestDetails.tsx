"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation" // Add this
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { UserX } from "lucide-react"
import { CategoryList } from "./CategoryList"
import { StartTestButton } from "./StartTestButton"
import { guestStorage } from "@/lib/storage/guest-storage"
import type { Test } from "@/types/tests/test"
import type { TestAttempt } from "@/types/tests/test-attempt"
import type { GuestAttemptSummary } from "@/types/tests/guest-attempt"

// app/(test-taking)/tests/[slug]/components/TestDetails.tsx
interface TestDetailsProps {
  test: Test;
  attempts?: TestAttempt[];
  isAuthenticated?: boolean;
}

export function TestDetails({ test, isAuthenticated = false }: TestDetailsProps) {
  const router = useRouter()
  const [guestAttempts, setGuestAttempts] = useState<GuestAttemptSummary[]>([])

  useEffect(() => {
    if (!isAuthenticated) {
      const attempts = guestStorage.getAttemptsByTestId(test.id)
      setGuestAttempts(attempts)
    }
  }, [test.id, isAuthenticated])

  const inProgressAttempt = guestAttempts.find(a => a.status === 'IN_PROGRESS')
  const recentGuestAttempts = guestAttempts
    .filter(a => a.status === 'COMPLETED')
    .slice(0, 3)

  const handleContinueTest = (attemptId: string) => {
    router.push(`/tests/${test.slug}/attempt/${attemptId}`)
  }

  const handleViewResults = (attemptId: string) => {
    router.push(`/tests/${test.slug}/attempt/${attemptId}/results`)
  }

  const handleSignIn = () => {
    // Store current test ID in session storage for redirect after sign in
    sessionStorage.setItem('redirectAfterSignIn', `/tests/${test.slug}`)
    router.push('/sign-in')
  }

  return (
    <div className="space-y-6">
      {/* Test Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{test.title}</h1>
        {test.description && (
          <p className="text-muted-foreground">{test.description}</p>
        )}
      </div>

      {/* Guest Mode Alert */}
      {!isAuthenticated && (
        <Alert>
          <UserX className="h-4 w-4" />
          <AlertDescription>
            You are in guest mode. Your progress will be saved locally for 30 days.
            <Button variant="link" className="pl-1" onClick={handleSignIn}>
              Sign in to keep your results permanently
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Categories Overview */}
      <CategoryList categories={test.categories || []} />

      {/* Test Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Test Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p>Total Questions: {test._count?.questions ?? 0}</p>
          <p>Categories: {test.categories?.length ?? 0}</p>
        </CardContent>
      </Card>

      {/* Guest Attempts Section */}
      {!isAuthenticated && guestAttempts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Your Progress</CardTitle>
            <CardDescription>
              {inProgressAttempt ? "Continue your test or start fresh" : "Your recent attempts"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {inProgressAttempt && (
              <div className="space-y-2">
                <h4 className="font-medium">In Progress</h4>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-muted-foreground">
                    {inProgressAttempt.progress.answeredQuestions} of {inProgressAttempt.progress.totalQuestions} questions completed
                  </p>
                  <Button 
                    variant="secondary" 
                    size="sm"
                    onClick={() => handleContinueTest(inProgressAttempt.id)}
                  >
                    Continue Test
                  </Button>
                </div>
              </div>
            )}

            {recentGuestAttempts.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium">Recent Attempts</h4>
                {recentGuestAttempts.map((attempt) => (
                  <div key={attempt.id} className="flex justify-between items-center">
                    <p className="text-sm text-muted-foreground">
                      Score: {attempt.score?.percentageScore.toFixed(1)}%
                    </p>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleViewResults(attempt.id)}
                    >
                      View Results
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Start Test Button */}
      <StartTestButton 
        testId={test.id}
        slug={test.slug} // Add this
        disabled={false}
        isAuthenticated={isAuthenticated}
        existingAttempt={inProgressAttempt}
      />
    </div>
  )
}
