// hooks/use-analysis.ts
import { useState, useCallback, useEffect } from 'react';
import type { TestAnalysisResponse } from '@/types/test-analysis';

export function useAnalysis(attemptId: string, initialData?: TestAnalysisResponse) {
  const [analysis, setAnalysis] = useState<TestAnalysisResponse | null>(initialData ?? null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check for existing analysis
  const checkExistingAnalysis = useCallback(async () => {
    try {
      const response = await fetch(`/api/test-analysis?attemptId=${attemptId}`);
      
      if (response.status === 404) {
        // Analysis doesn't exist yet, this is fine
        return;
      }
      
      if (!response.ok) {
        throw new Error("Failed to check analysis status");
      }

      const data = await response.json();
      if (data.success) {
        setAnalysis(data);
        sessionStorage.setItem(`analysis-${attemptId}`, JSON.stringify(data));
      }
    } catch (err) {
      console.error("Error checking analysis:", err);
      // Don't set error state here as this is just a check
    }
  }, [attemptId]);

  // Generate new analysis
  const generateAnalysis = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch('/api/test-analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          testAttemptId: attemptId,
        }),
      });
      
      if (!response.ok) {
        throw new Error("Failed to generate analysis");
      }

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.error || "Failed to generate analysis");
      }

      setAnalysis(data);
      sessionStorage.setItem(`analysis-${attemptId}`, JSON.stringify(data));
    } catch (err) {
      console.error("Analysis generation error:", err);
      setError(err instanceof Error ? err.message : "Failed to generate analysis");
    } finally {
      setIsLoading(false);
    }
  }, [attemptId]);

  useEffect(() => {
    checkExistingAnalysis();
  }, [checkExistingAnalysis]);

  const retry = useCallback(() => {
    generateAnalysis();
  }, [generateAnalysis]);

  return {
    analysis,
    isLoading,
    error,
    generateAnalysis,
    retry
  };
}