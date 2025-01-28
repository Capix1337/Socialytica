"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@clerk/nextjs"
import { useGuestMigration } from "@/hooks/use-guest-migration"
import { toast } from "sonner"

export function AuthGuestHandler() {
  const { userId, isLoaded } = useAuth()
  const { migrateGuestData, isMigrating, hasGuestData } = useGuestMigration()
  const [hasMigrated, setHasMigrated] = useState(() => {
    // Check if migration was previously completed
    if (typeof window !== 'undefined') {
      return localStorage.getItem('guestDataMigrated') === 'true'
    }
    return false
  })

  useEffect(() => {
    if (!isLoaded || !userId || !hasGuestData || isMigrating || hasMigrated) return

    const migrationToast = toast.loading('Migrating your guest test data...', {
      duration: Infinity,
    })

    migrateGuestData()
      .then((success) => {
        if (success) {
          setHasMigrated(true)
          localStorage.setItem('guestDataMigrated', 'true')
          toast.success('Test data migration complete!', {
            description: 'All your test results are now available in your account.',
          })
        } else {
          toast.error('Migration failed', {
            description: 'Please try again or contact support if the issue persists.',
          })
        }
      })
      .catch((error) => {
        toast.error('Migration error', {
          description: 'An unexpected error occurred during migration.',
        })
        console.error('Migration error:', error)
      })
      .finally(() => {
        toast.dismiss(migrationToast)
      })

    return () => {
      toast.dismiss(migrationToast)
    }
  }, [userId, isLoaded, hasGuestData, isMigrating, hasMigrated, migrateGuestData])

  return null
}