// app/(test-taking)/tests/components/RecentlyTakenTests.tsx
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import Link from "next/link"
import type { TestAttempt } from "@/types/tests/test-attempt"
import type { GuestAttemptSummary } from "@/types/tests/guest-attempt"
import { isTestAttempt } from "../utils/type-guards"

interface RecentlyTakenTestsProps {
  attempts: (TestAttempt | GuestAttemptSummary)[]
}

export function RecentlyTakenTests({ attempts }: RecentlyTakenTestsProps) {
  if (!attempts.length) return null

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Recent Results</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        {attempts.map((attempt) => {
          const completedDate = isTestAttempt(attempt) 
            ? attempt.completedAt
            : new Date(attempt.startedAt);
          const score = isTestAttempt(attempt)
            ? attempt.percentageScore
            : attempt.score?.percentageScore;
          const title = isTestAttempt(attempt)
            ? attempt.test?.title
            : attempt.testTitle;

          return (
            <div key={attempt.id} className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">
                  {title ?? "Untitled Test"}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {completedDate && 
                    `Completed ${new Date(completedDate).toLocaleDateString()}`
                  }
                </p>
              </div>
              <div className="flex items-center gap-4">
                {score !== null && (
                  <Badge 
                    variant="secondary"
                    className={cn(
                      score >= 70 
                        ? "bg-green-100 text-green-800" 
                        : "bg-secondary text-secondary-foreground"
                    )}
                  >
                    {Math.round(score)}%
                  </Badge>
                )}
                <Link 
                  href={`/tests/${isTestAttempt(attempt) ? attempt.test?.id : attempt.testId}/attempt/${attempt.id}/results`}
                  className="text-sm underline"
                >
                  View Results
                </Link>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}