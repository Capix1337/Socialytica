import { useRouter, usePathname } from "next/navigation"
import { useCallback } from "react"

interface NavigationState {
  currentPath: string
  navigate: (path: AdminPath) => void
  isCurrentPath: (path: AdminPath) => boolean
}

type AdminPath = 
  | "/admindash"
  | "/admindash/users"
  | "/admindash/tests"
  | "/admindash/analytics"
  | "/admindash/settings"

export function useNavigation(): NavigationState {
  const router = useRouter()
  const pathname = usePathname()

  const navigate = useCallback((path: AdminPath) => {
    router.push(path)
  }, [router])

  const isCurrentPath = useCallback((path: AdminPath) => {
    return pathname === path
  }, [pathname])

  return {
    currentPath: pathname,
    navigate,
    isCurrentPath
  }
}