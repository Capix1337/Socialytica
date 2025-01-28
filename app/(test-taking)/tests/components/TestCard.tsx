"use client"

import Link from "next/link"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ArrowRight, UserX } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Test } from "@/types/tests/test"
import type { TestAttempt } from "@/types/tests/test-attempt"
import type { GuestAttemptSummary } from "@/types/tests/guest-attempt"
import { getAttemptProgress } from "../utils/attempt"
import { isGuestAttempt } from "../utils/type-guards" // Add this import

interface TestCardProps {
  test: Test;
  viewType?: "grid" | "list";
  attempt?: TestAttempt | GuestAttemptSummary;
  isAuthenticated?: boolean;
}

export function TestCard({ 
  test, 
  attempt,
  viewType = "grid",
  isAuthenticated = false 
}: TestCardProps) {
  const progressInfo = attempt && getAttemptProgress(attempt)
  // Now isGuestAttempt is properly imported and can be used
  const isGuest = attempt && isGuestAttempt(attempt)

  return (
    <Card className={cn(
      "flex flex-col transition-all hover:shadow-md",
      viewType === "grid" ? "h-full min-h-[400px]" : "min-h-[200px]",
      isGuest && "border-dashed"
    )}>
      <Link href={`/tests/${test.id}`} className="flex-1">
        <CardHeader>
          <div className="flex justify-between items-start">
            <CardTitle className="line-clamp-2 text-xl">
              {test.title}
            </CardTitle>
            {/* Guest mode indicator */}
            {!isAuthenticated && (
              <Badge variant="secondary" className="shrink-0">
                <UserX className="h-3 w-3 mr-1" />
                Guest Mode
              </Badge>
            )}
          </div>
          {test.description && (
            <CardDescription className="line-clamp-2 mt-2">
              {test.description}
            </CardDescription>
          )}
        </CardHeader>

        <CardContent>
          {/* Categories */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-2 max-h-[80px] overflow-y-auto scrollbar-thin">
              {test.categories?.map((category) => (
                <div key={category.id} className="flex-shrink-0">
                  <Badge 
                    key={category.id} 
                    variant="secondary"
                    className="text-xs whitespace-nowrap"
                  >
                    {category.name}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
          
          {/* Progress section with guest indicator */}
          {attempt && attempt.status === "IN_PROGRESS" && progressInfo && (
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span>{progressInfo.progress}%</span>
              </div>
              <Progress 
                value={progressInfo.progress}
                className={cn(
                  "h-2",
                  isGuest && "opacity-80" // Slightly dimmed for guest attempts
                )}
              />
              <div className="flex justify-between items-center text-xs">
                <span className="text-muted-foreground">
                  {progressInfo.answeredQuestions} of {progressInfo.totalQuestions} questions
                </span>
                {isGuest && (
                  <span className="text-muted-foreground flex items-center gap-1">
                    <UserX className="h-3 w-3" />
                    Guest Progress
                  </span>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Link>
      
      <CardFooter className="border-t p-4 mt-auto">
        <Button 
          className={cn(
            "w-full",
            isGuest && "border-dashed" // Consistent guest styling
          )} 
          asChild
        >
          <Link href={
            attempt 
              ? `/tests/${test.id}/attempt/${attempt.id}` 
              : `/tests/${test.id}`
          }>
            {attempt ? (
              <>
                Continue Test
                {isGuest && <UserX className="h-4 w-4 mx-1" />}
                <ArrowRight className="h-4 w-4 ml-1" />
              </>
            ) : (
              <>
                Start Test
                {!isAuthenticated && <UserX className="h-4 w-4 mx-1" />}
                <ArrowRight className="h-4 w-4 ml-1" />
              </>
            )}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}