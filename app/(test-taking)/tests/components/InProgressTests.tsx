// app/(test-taking)/tests/components/InProgressTests.tsx
"use client"

import { useUser } from "@clerk/nextjs"
import { GuestInProgressTests } from "./GuestInProgressTests"
import { UserInProgressTests } from "./UserInProgressTests"
import { isTestAttempt } from "@/lib/utils/type-guards"
import type { TestAttempt } from "@/types/tests/test-attempt"
import type { GuestAttemptSummary } from "@/types/tests/guest-attempt"

interface InProgressTestsProps {
  attempts: (TestAttempt | GuestAttemptSummary)[]
}

export function InProgressTests({ attempts }: InProgressTestsProps) {
  const { isSignedIn } = useUser()

  if (!attempts.length) return null

  if (isSignedIn) {
    const userAttempts = attempts.filter(isTestAttempt)
    return <UserInProgressTests attempts={userAttempts} />
  }

  const guestAttempts = attempts.filter((a): a is GuestAttemptSummary => !isTestAttempt(a))
  return <GuestInProgressTests attempts={guestAttempts} />
}