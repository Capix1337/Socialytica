"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@clerk/nextjs"
import { Card, CardContent } from "@/components/ui/card"
import { ResultsContent } from "./_components/ResultsContent"
import { BlurredResults } from "./_components/BlurredResults"
import { AuthOverlay } from "./_components/AuthOverlay"
import type { TestAttemptResult } from "@/types/tests/test-attempt"
import type { GuestAttemptResult } from "@/types/tests/guest-attempt"

interface ResultsPageProps {
  params: Promise<{
    attemptId: string
  }>
}

export default function ResultsPage({ params }: ResultsPageProps) {
  const { isSignedIn } = useAuth()
  const [results, setResults] = useState<TestAttemptResult | GuestAttemptResult | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [attemptId, setAttemptId] = useState<string>("")

  useEffect(() => {
    params.then(resolvedParams => {
      setAttemptId(resolvedParams.attemptId)
    })
  }, [params])

  useEffect(() => {
    if (!attemptId) return

    async function fetchResults() {
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
    }

    fetchResults()
  }, [attemptId, isSignedIn])

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
      {'isBlurred' in results ? (
        <>
          <BlurredResults results={results} />
          <AuthOverlay testName={results.test.name} />
        </>
      ) : (
        <ResultsContent results={results} />
      )}
    </div>
  )
}