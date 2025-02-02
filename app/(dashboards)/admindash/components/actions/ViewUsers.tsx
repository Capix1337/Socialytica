"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Users } from "lucide-react"

export function ViewUsers() {
  const router = useRouter()

  const handleViewUsers = () => {
    router.push("/admindash/users")
  }

  return (
    <Button 
      onClick={handleViewUsers} 
      className="w-full justify-start" 
      variant="outline"
    >
      <Users className="mr-2 h-4 w-4" />
      View Users
    </Button>
  )
}