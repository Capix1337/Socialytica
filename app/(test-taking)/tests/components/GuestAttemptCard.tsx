// app/(test-taking)/tests/components/GuestAttemptCard.tsx
"use client"

import Link from "next/link"
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, UserX } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import type { GuestAttemptSummary } from "@/types/tests/guest-attempt"

interface GuestAttemptCardProps {
  attempt: GuestAttemptSummary
  variant?: "default" | "compact"
}

export function GuestAttemptCard({ attempt}: GuestAttemptCardProps) {
  const isCompleted = attempt.status === "COMPLETED"
  const formattedDate = formatDistanceToNow(new Date(attempt.startedAt), { addSuffix: true })

  return (
    <Card className="relative">
      <CardHeader className="space-y-1">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h4 className="text-base font-semibold leading-none">
              {attempt.testTitle}
            </h4>
            <p className="text-sm text-muted-foreground">
              Started {formattedDate}
            </p>
          </div>
          <Badge variant="secondary" className="shrink-0">
            <UserX className="h-3 w-3 mr-1" />
            Guest
          </Badge>
        </div>
      </CardHeader>

      <CardContent>
        {isCompleted ? (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Final Score</span>
              <span>{Math.round(attempt.score?.percentageScore ?? 0)}%</span>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{attempt.progress.percentageComplete}%</span>
            </div>
            <Progress 
              value={attempt.progress.percentageComplete} 
              className="h-2"
            />
            <p className="text-sm text-muted-foreground">
              {attempt.progress.answeredQuestions} of {attempt.progress.totalQuestions} questions completed
            </p>
          </div>
        )}
      </CardContent>

      <CardFooter className="border-t pt-4">
        <Button className="w-full" asChild>
          <Link
            href={`/tests/${attempt.testId}/attempt/${attempt.id}${isCompleted ? '/results' : ''}`}
          >
            {isCompleted ? (
              <>
                View Results
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            ) : (
              <>
                Continue Test
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}