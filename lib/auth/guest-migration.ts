import { guestStorage } from "@/lib/storage/guest-storage"
import type { GuestMigrationResponse } from "@/types/tests/guest-attempt"

export class GuestMigrationService {
  async migrateGuestData(guestId: string): Promise<GuestMigrationResponse> {
    try {
      const response = await fetch('/api/tests/guest/migrate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ guestId }),
      })

      if (!response.ok) {
        throw new Error('Failed to migrate guest data')
      }

      const result = await response.json()

      // Clear guest storage after successful migration
      if (result.success) {
        guestStorage.clearGuestData()
      }

      return result
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Migration failed'
      }
    }
  }
}

export const guestMigration = new GuestMigrationService()