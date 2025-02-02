"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@clerk/nextjs"
import { Card, CardContent } from "@/components/ui/card"
import { ResultsContent } from "./_components/ResultsContent"
import { BlurredResults } from "./_components/BlurredResults"
import { AuthOverlay } from "./_components/AuthOverlay"
import type { TestAttemptResult } from "@/types/tests/test-attempt"
import type { GuestAttemptResult } from "@/types/tests/guest-attempt"
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

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

  // Add states for analysis
  const [analysis, setAnalysis] = useState<TestAnalysisResponse | null>(null);
  const [isGeneratingAnalysis, setIsGeneratingAnalysis] = useState(false);
  const [analysisError, setAnalysisError] = useState<string | null>(null);

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

  // Add function to generate analysis
  const generateAnalysis = async () => {
    try {
      setIsGeneratingAnalysis(true);
      setAnalysisError(null);

      const response = await fetch(`/api/test-analysis?attemptId=${attemptId}`);
      
      if (!response.ok) {
        throw new Error("Failed to generate analysis");
      }

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.error || "Failed to generate analysis");
      }

      setAnalysis(data);
    } catch (err) {
      console.error("Analysis generation error:", err);
      setAnalysisError(err instanceof Error ? err.message : "Failed to generate analysis");
    } finally {
      setIsGeneratingAnalysis(false);
    }
  };

  if (loading) {
    return <ResultsLoadingState />;
  }

  if (error || !results) {
    return <ResultsErrorState error={error} />;
  }

  return (
    <div className="container py-8">
      {isSignedIn ? (
        <>
          {/* Existing Results Content */}
          <div className="grid gap-6">
            <ResultsContent results={results} />
            
            {/* Analysis Section */}
            <Card className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">AI Analysis</h2>
                  {!analysis && (
                    <Button 
                      onClick={generateAnalysis}
                      disabled={isGeneratingAnalysis}
                    >
                      {isGeneratingAnalysis ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Generating Analysis...
                        </>
                      ) : (
                        "Generate Analysis"
                      )}
                    </Button>
                  )}
                </div>

                {analysisError && (
                  <div className="text-sm text-red-500">
                    {analysisError}
                  </div>
                )}

                {analysis?.data && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="font-medium">Analysis</h3>
                      <p className="text-muted-foreground">
                        {analysis.data.analysis}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-medium">Advice</h3>
                      <p className="text-muted-foreground">
                        {analysis.data.advice}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </>
      ) : (
        <>
          <BlurredResults results={results} />
          <AuthOverlay testName={results.test.name} />
        </>
      )}
    </div>
  );
}

// Add loading state component
function ResultsLoadingState() {
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
  );
}

// Add error state component
function ResultsErrorState({ error }: { error: string | null }) {
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
  );
}