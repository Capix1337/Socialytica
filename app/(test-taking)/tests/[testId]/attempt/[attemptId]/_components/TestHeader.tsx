// app/(test-taking)/tests/[testId]/attempt/[attemptId]/_components/TestHeader.tsx
"use client"

import { Progress } from "@/components/ui/progress"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface TestHeaderProps {
  title: string
  currentCategory: string
  totalQuestions: number
  answeredQuestions: number
  // Removed: currentCategoryProgress
}

export function TestHeader({ 
  title,
  currentCategory,
  totalQuestions,
  answeredQuestions,
}: TestHeaderProps) {
  const overallProgress = Math.round((answeredQuestions / totalQuestions) * 100)

  return (
    <header className="bg-white border-b">
      <div className="container max-w-7xl mx-auto">
        {/* Top section with title and progress counter */}
        <div className="flex items-center h-16 px-4">
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="mr-4 md:hidden"
          >
            <Link href="/tests">
              <ChevronLeft className="h-4 w-4" />
            </Link>
          </Button>
          
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-semibold truncate">{title}</h1>
            <div className="text-sm text-muted-foreground mt-0.5">
              {currentCategory}
            </div>
          </div>

          <div className="hidden md:block ml-4 text-sm text-muted-foreground">
            {answeredQuestions} of {totalQuestions} questions answered
          </div>
        </div>

        {/* Overall progress bar section */}
        <div className="px-4 pb-4">
          <div className="space-y-1.5">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{overallProgress}%</span>
            </div>
            <Progress value={overallProgress} className="h-2" />
          </div>
        </div>
      </div>
    </header>
  )
}