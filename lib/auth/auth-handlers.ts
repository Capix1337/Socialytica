import { guestStorage } from "@/lib/storage/guest-storage"
import { guestMigration } from "./guest-migration"
import { toast } from "sonner"

export async function handleAuthStateChange(userId: string | null) {
  // Handle sign-in
  if (userId) {
    const guestData = guestStorage.getGuestData()
    if (guestData) {
      try {
        const result = await guestMigration.migrateGuestData(guestData.guestId)
        if (result.success) {
          toast.success('Guest test data successfully migrated to your account')
        } else {
          toast.error('Failed to migrate guest data')
        }
      } catch (error) {
        console.error('Migration error:', error)
        toast.error('Error migrating guest data')
      }
    }
  }
}