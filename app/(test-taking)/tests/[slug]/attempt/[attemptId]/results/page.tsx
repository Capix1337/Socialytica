// app/(test-taking)/tests/[slug]/attempt/[attemptId]/results/page.tsx
"use client"

import { useEffect, useState, useCallback } from "react"
import { useAuth } from "@clerk/nextjs"
import { Card, CardContent } from "@/components/ui/card"
import { ResultsContent } from "./_components/ResultsContent"
import { BlurredResults } from "./_components/BlurredResults"
import { AuthOverlay } from "./_components/AuthOverlay"
import type { TestAttemptResult } from "@/types/tests/test-attempt"
import type { GuestAttemptResult } from "@/types/tests/guest-attempt"
import { Analysis } from "@/components/test/Analysis"

interface ResultsPageProps {
  params: Promise<{
    attemptId: string
  }>
}

// Add type guard
function isGuestResult(
  result: TestAttemptResult | GuestAttemptResult
): result is GuestAttemptResult {
  return 'isBlurred' in result && 'needsAuth' in result;
}

export default function ResultsPage({ params }: ResultsPageProps) {
  const { isSignedIn } = useAuth()
  const [results, setResults] = useState<TestAttemptResult | GuestAttemptResult | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [attemptId, setAttemptId] = useState<string>("")

  const fetchResults = useCallback(async () => {
    if (!attemptId) return
    
    try {
      const endpoint = isSignedIn 
        ? `/api/tests/attempt/${attemptId}/results`
        : `/api/tests/guest/attempt/${attemptId}/results`

      const response = await fetch(endpoint)
      if (!response.ok) {
        throw new Error("Failed to fetch results")
      }
      const data = await response.json()
      
      if (!data || data.error) {
        throw new Error(data.error || "Failed to load results")
      }
      
      setResults(data)
    } catch (err) {
      console.error('Error details:', err)
      setError(err instanceof Error ? err.message : "Failed to load results")
    } finally {
      setLoading(false)
    }
  }, [attemptId, isSignedIn])

  useEffect(() => {
    params.then(resolvedParams => {
      setAttemptId(resolvedParams.attemptId)
    })
  }, [params])

  useEffect(() => {
    if (!attemptId) return
    fetchResults()
  }, [attemptId, fetchResults])

  if (loading) {
    return (
      <div className="container flex items-center justify-center min-h-[90vh]">
        <Card className="w-full max-w-[600px]">
          <CardContent className="p-6">
            <div className="text-center py-8">
              <h2 className="text-lg font-semibold">Loading Results...</h2>
              <p className="text-muted-foreground mt-2">
                Please wait while we calculate your scores.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (error || !results) {
    return (
      <div className="container flex items-center justify-center min-h-[90vh]">
        <Card className="w-full max-w-[600px]">
          <CardContent className="p-6">
            <div className="text-center py-8">
              <h2 className="text-lg font-semibold text-destructive">Error</h2>
              <p className="text-muted-foreground mt-2">
                {error || "Failed to load results"}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container py-8">
      {isSignedIn ? (
        <div className="space-y-8">
          <ResultsContent results={results} />
          <Analysis attemptId={attemptId} />
        </div>
      ) : (
        isGuestResult(results) ? (
          <>
            <BlurredResults results={results} />
            <AuthOverlay testName={results.test.name} />
          </>
        ) : (
          <div className="text-center">
            <p className="text-destructive">Invalid result type</p>
          </div>
        )
      )}
    </div>
  )
}