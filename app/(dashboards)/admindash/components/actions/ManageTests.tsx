"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { FileText } from "lucide-react"

export function ManageTests() {
  const router = useRouter()

  const handleManageTests = () => {
    router.push("/admindash/tests")
  }

  return (
    <Button 
      onClick={handleManageTests} 
      className="w-full justify-start" 
      variant="outline"
    >
      <FileText className="mr-2 h-4 w-4" />
      Manage Tests
    </Button>
  )
}