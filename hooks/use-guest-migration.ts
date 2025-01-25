import { useState, useCallback } from 'react'
import { useAuth } from '@clerk/nextjs'
import { guestStorage } from '@/lib/storage/guest-storage'
import { guestMigration } from '@/lib/auth/guest-migration'
import { toast } from 'sonner'

export function useGuestMigration() {
  const { isSignedIn } = useAuth()
  const [isMigrating, setIsMigrating] = useState(false)

  const migrateGuestData = useCallback(async () => {
    if (!isSignedIn) return

    const guestData = guestStorage.getGuestData()
    if (!guestData) return

    try {
      setIsMigrating(true)
      const result = await guestMigration.migrateGuestData(guestData.guestId)

      if (result.success) {
        toast.success('Your guest test data has been successfully migrated')
        return true
      } else {
        toast.error(result.error || 'Failed to migrate guest data')
        return false
      }
    } catch (error) {
      console.error('Migration error:', error)
      toast.error('Error during data migration')
      return false
    } finally {
      setIsMigrating(false)
    }
  }, [isSignedIn])

  return {
    isMigrating,
    migrateGuestData,
    hasGuestData: !!guestStorage.getGuestData()
  }
}