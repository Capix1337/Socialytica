// app/(test-taking)/tests/[testId]/attempt/[attemptId]/results/_components/BlurredResults.tsx
import { cn } from "@/lib/utils"
import { ResultsContent } from "./ResultsContent"
import type { GuestAttemptResult } from "@/types/tests/guest-attempt"

interface BlurredResultsProps {
  results: GuestAttemptResult;
}

export function BlurredResults({ results }: BlurredResultsProps) {
  return (
    <div className="relative">
      <div 
        className={cn(
          "absolute inset-0 z-20 backdrop-blur-md",
          "bg-background/50 pointer-events-none"
        )} 
      />
      <ResultsContent 
        results={results} 
        className="opacity-50 pointer-events-none"
      />
    </div>
  )
}