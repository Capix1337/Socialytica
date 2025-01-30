// app/(test-taking)/tests/components/InProgressTests.tsx
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ArrowRight, UserX } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { getAttemptProgress } from "../utils/attempt"
import { isTestAttempt } from "../utils/type-guards"
import type { TestAttempt } from "@/types/tests/test-attempt"
import type { GuestAttemptSummary } from "@/types/tests/guest-attempt"

interface InProgressTestsProps {
  attempts: (TestAttempt | GuestAttemptSummary)[]
}

export function InProgressTests({ attempts }: InProgressTestsProps) {
  if (!attempts.length) return null

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Continue Test</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        {attempts.map((attempt) => {
          const { answeredQuestions, totalQuestions, progress } = getAttemptProgress(attempt)
          const isGuest = !isTestAttempt(attempt)
          
          return (
            <div key={attempt.id} className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">
                    {isGuest ? attempt.testTitle : attempt.test?.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {answeredQuestions} of {totalQuestions} questions completed
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {isGuest && (
                    <Badge variant="secondary" className="shrink-0">
                      <UserX className="h-3 w-3 mr-1" />
                      Guest
                    </Badge>
                  )}
                  <Button asChild size="sm">
                    <Link href={`/tests/${isGuest ? attempt.testSlug : attempt.test?.slug}/attempt/${attempt.id}`}>
                      Continue <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}