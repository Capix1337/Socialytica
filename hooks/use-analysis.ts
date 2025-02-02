// hooks/use-analysis.ts
import { useState, useCallback } from 'react';
import type { TestAnalysisResponse } from '@/types/test-analysis';

export function useAnalysis(attemptId: string, initialData?: TestAnalysisResponse) {
  const [analysis, setAnalysis] = useState<TestAnalysisResponse | null>(initialData ?? null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateAnalysis = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(`/api/test-analysis?attemptId=${attemptId}`);
      
      if (!response.ok) {
        throw new Error("Failed to generate analysis");
      }

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.error || "Failed to generate analysis");
      }

      setAnalysis(data);
      
      // Cache the analysis in sessionStorage
      sessionStorage.setItem(`analysis-${attemptId}`, JSON.stringify(data));
    } catch (err) {
      console.error("Analysis generation error:", err);
      setError(err instanceof Error ? err.message : "Failed to generate analysis");
    } finally {
      setIsLoading(false);
    }
  }, [attemptId]);

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