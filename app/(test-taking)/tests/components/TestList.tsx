"use client"

import { useCallback, useEffect, useState } from "react"
import { useUser } from "@clerk/nextjs"
import { guestStorage } from "@/lib/storage/guest-storage"
import { TestsPageHeader } from "./TestsPageHeader"
import { TestCard } from "./TestCard"
import { TestCardSkeleton } from "./TestCardSkeleton"
import { TestsPagination } from "./TestsPagination"
import { InProgressTests } from "./InProgressTests"
import { RecentlyTakenTests } from "./RecentlyTakenTests"
import { getPublicTests } from "@/lib/tests"
import { isGuestAttempt } from "@/lib/utils/type-guards"
import type { Test } from "@/types/tests/test"
import type { TestAttempt } from "@/types/tests/test-attempt"
import type { GuestAttemptSummary } from "@/types/tests/guest-attempt"

export function TestList() {
  const { isSignedIn } = useUser();
  const [tests, setTests] = useState<Test[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalTests, setTotalTests] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [view, setView] = useState<"grid" | "list">("grid")
  const [inProgressAttempts, setInProgressAttempts] = useState<(TestAttempt | GuestAttemptSummary)[]>([])
  const [recentAttempts, setRecentAttempts] = useState<(TestAttempt | GuestAttemptSummary)[]>([])

  const fetchTests = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)
      const data = await getPublicTests({ 
        page: currentPage.toString(),
        search: searchQuery 
      })
      setTests(data.tests)
      setTotalPages(data.totalPages)
      setTotalTests(data.totalTests)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load tests')
    } finally {
      setIsLoading(false)
    }
  }, [currentPage, searchQuery]) // Only depend on values needed for the API call

  const fetchUserAttempts = useCallback(async () => {
    try {
      if (isSignedIn) {
        // Fetch authenticated user attempts
        const response = await fetch('/api/tests/attempts')
        if (!response.ok) throw new Error('Failed to fetch attempts')
        const data = await response.json()
        
        setInProgressAttempts(data.inProgress)
        setRecentAttempts(data.completed)
      } else {
        // Get guest attempts from localStorage
        const guestId = guestStorage.getGuestId()
        if (!guestId) return

        // Fetch guest attempts from API with proper URL structure
        const response = await fetch(`/api/tests/guest/attempts?guestId=${guestId}`)
        if (!response.ok) throw new Error('Failed to fetch guest attempts')
        const data = await response.json()
        
        setInProgressAttempts(data.inProgress)
        setRecentAttempts(data.completed)
      }
    } catch (error) {
      console.error('Failed to fetch attempts:', error)
      setError(error instanceof Error ? error.message : 'Failed to fetch attempts')
    }
  }, [isSignedIn])

  useEffect(() => {
    void fetchTests()
  }, [fetchTests]) // fetchTests now has stable dependencies

  useEffect(() => {
    fetchUserAttempts(); // Call once on mount/auth change
  }, [fetchUserAttempts])

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query)
    setCurrentPage(1)
  }, [])

  const listClassName = view === "grid" 
    ? "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    : "space-y-4"

  // Helper function to match attempt with test
  const findMatchingAttempt = (test: Test) => {
    return inProgressAttempts.find(attempt => 
      isGuestAttempt(attempt) 
        ? attempt.testId === test.id || attempt.testSlug === test.slug
        : attempt.testId === test.id
    )
  }

  if (isLoading) {
    return (
      <div className={listClassName}>
        {Array.from({ length: 8 }).map((_, i) => (
          <TestCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (error) return <div>Error: {error}</div>

  return (
    <div className="space-y-8">
      <TestsPageHeader
        totalTests={totalTests}
        onSearch={handleSearch}
        view={view}
        onViewChange={setView}
      />

      {/* Progress Sections */}
      <div className="grid gap-6 md:grid-cols-2">
        <InProgressTests attempts={inProgressAttempts} />
        <RecentlyTakenTests attempts={recentAttempts} />
      </div>

      {/* Existing Tests Grid */}
      <div className={listClassName}>
        {isLoading ? (
          Array.from({ length: 8 }).map((_, i) => (
            <TestCardSkeleton key={i} />
          ))
        ) : (
          tests.map((test) => (
            <TestCard 
              key={test.id} 
              test={test}
              viewType={view}
              attempt={findMatchingAttempt(test)}
              isAuthenticated={isSignedIn}
            />
          ))
        )}
      </div>

      <TestsPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  )
}