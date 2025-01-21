"use client"

import { useEffect } from "react"
import { useAuth } from "@clerk/nextjs"
import { useGuestMigration } from "@/hooks/use-guest-migration"
import { toast } from "sonner"

export function AuthGuestHandler() {
  const { userId, isLoaded } = useAuth()
  const { migrateGuestData, isMigrating, hasGuestData } = useGuestMigration()

  useEffect(() => {
    if (!isLoaded) return

    // Handle sign-in with guest data
    if (userId && hasGuestData && !isMigrating) {
      toast.loading('Checking for guest test data...', {
        duration: 1000,
      })

      migrateGuestData().then((success) => {
        if (success) {
          toast.success('Your test data has been successfully migrated!', {
            description: 'You can now view all your test results.',
          })
        }
      })
    }
  }, [userId, isLoaded, hasGuestData, isMigrating, migrateGuestData])

  // This is a utility component - no UI needed
  return null
}