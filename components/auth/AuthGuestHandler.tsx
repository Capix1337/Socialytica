"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@clerk/nextjs"
import { useGuestMigration } from "@/hooks/use-guest-migration"
import { toast } from "sonner"

export function AuthGuestHandler() {
  const { userId, isLoaded } = useAuth()
  const { migrateGuestData, isMigrating, hasGuestData } = useGuestMigration()
  const [hasMigrated, setHasMigrated] = useState(false)

  useEffect(() => {
    if (!isLoaded || !userId || !hasGuestData || isMigrating || hasMigrated) return

    const migrationToast = toast.loading('Migrating your guest test data...', {
      duration: Infinity,
    })

    migrateGuestData()
      .then((success) => {
        if (success) {
          setHasMigrated(true)
          toast.success('Test data migration complete!', {
            description: 'All your test results are now available in your account.',
          })
        } else {
          toast.error('Migration failed', {
            description: 'Unable to migrate your test data. Please try again.',
          })
        }
      })
      .finally(() => {
        toast.dismiss(migrationToast)
      })
  }, [userId, isLoaded, hasGuestData, isMigrating, hasMigrated, migrateGuestData])

  return null
}