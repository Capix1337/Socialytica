import { useRouter } from "next/navigation"
import { useCallback, useState } from "react"
import { toast } from "@/hooks/use-toast"

interface ActionHandlers {
  handleCreateTest: () => void
  handleViewUsers: () => void
  handleManageTests: () => void
  handleViewAnalytics: () => void
  isLoading: boolean
}

export function useActionHandlers(): ActionHandlers {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleCreateTest = useCallback(async () => {
    try {
      setIsLoading(true)
      // You could add API call here if needed before navigation
      router.push("/admindash/tests/new")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create new test",
        variant: "destructive"
      })
      console.error("Create test error:", error)
    } finally {
      setIsLoading(false)
    }
  }, [router])

  const handleViewUsers = useCallback(() => {
    router.push("/admindash/users")
  }, [router])

  const handleManageTests = useCallback(() => {
    router.push("/admindash/tests")
  }, [router])

  const handleViewAnalytics = useCallback(() => {
    router.push("/admindash/analytics")
  }, [router])

  return {
    handleCreateTest,
    handleViewUsers,
    handleManageTests,
    handleViewAnalytics,
    isLoading
  }
}