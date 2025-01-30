// app/(test-taking)/tests/[testId]/attempt/[attemptId]/results/_components/ResultsContent.tsx
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { ResultsSummary } from "./ResultsSummary"
import { CategoryScores } from "./CategoryScores"
import type { TestAttemptResult } from "@/types/tests/test-attempt"
import type { GuestAttemptResult } from "@/types/tests/guest-attempt"

interface ResultsContentProps {
  results: TestAttemptResult | GuestAttemptResult;
  className?: string;
}

export function ResultsContent({ results, className }: ResultsContentProps) {
  return (
    <div className={className}>
      <h1 className="text-3xl font-bold text-center mb-6">
        {results.test.name}
      </h1>

      <Card className="w-full max-w-[800px] mx-auto shadow-lg">
        <CardHeader className="text-center border-b pb-4">
          <h2 className="text-2xl font-bold">Test Results</h2>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-8">
            <ResultsSummary 
              totalScore={results.totalScore} 
              maxScore={results.maxScore} 
              percentageScore={results.percentageScore} 
            />
            <CategoryScores categoryScores={results.categoryScores} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}