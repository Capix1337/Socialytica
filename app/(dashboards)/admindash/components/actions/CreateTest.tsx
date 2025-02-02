"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Plus } from "lucide-react"

export function CreateTest() {
  const router = useRouter()

  const handleCreateTest = () => {
    router.push("/admindash/tests/new")
  }

  return (
    <Button 
      onClick={handleCreateTest} 
      className="w-full justify-start" 
      variant="outline"
    >
      <Plus className="mr-2 h-4 w-4" />
      Create New Test
    </Button>
  )
}