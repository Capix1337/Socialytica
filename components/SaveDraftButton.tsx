// components/SaveDraftButton.tsx
import { Button } from "@/components/ui/button"

interface SaveDraftButtonProps {
  onSave: () => Promise<void>
  disabled?: boolean
  loading?: boolean
  pendingCount: number
}

export function SaveDraftButton({ 
  onSave, 
  pendingCount,
  disabled 
}: SaveDraftButtonProps) {
  return (
    <Button 
      onClick={onSave}
      disabled={disabled || pendingCount === 0}
    >
      Save Draft ({pendingCount})
    </Button>
  )
}
