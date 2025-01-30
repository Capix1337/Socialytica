// app/(test-taking)/tests/components/GuestInProgressTests.tsx
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ArrowRight, UserX } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { getAttemptProgress } from "../utils/attempt"
import type { GuestAttemptSummary } from "@/types/tests/guest-attempt"

interface GuestInProgressTestsProps {
  attempts: GuestAttemptSummary[]
}

export function GuestInProgressTests({ attempts }: GuestInProgressTestsProps) {
  if (!attempts.length) return null

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Continue Test (Guest Mode)</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        {attempts.map((attempt) => {
          const { answeredQuestions, totalQuestions, progress } = getAttemptProgress(attempt)
          
          return (
            <div key={attempt.id} className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">{attempt.testTitle}</h4>
                  <p className="text-sm text-muted-foreground">
                    {answeredQuestions} of {totalQuestions} questions completed
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="shrink-0">
                    <UserX className="h-3 w-3 mr-1" />
                    Guest
                  </Badge>
                  <Button asChild size="sm">
                    <Link href={`/tests/${attempt.testSlug}/attempt/${attempt.id}`}>
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