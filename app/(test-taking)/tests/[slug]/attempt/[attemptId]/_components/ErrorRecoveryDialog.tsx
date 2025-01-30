// app/(test-taking)/tests/[slug]/attempt/[attemptId]/_components/ErrorRecoveryDialog.tsx

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog"
import { AttemptError } from "@/lib/errors/attempt-errors"
import { AlertTriangle } from "lucide-react"

interface ErrorRecoveryDialogProps {
  error: AttemptError
  onRetry: () => void
  onDismiss: () => void
}

export function ErrorRecoveryDialog({ error, onRetry, onDismiss }: ErrorRecoveryDialogProps) {
  return (
    <AlertDialog open={true}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
            Error Occurred
          </AlertDialogTitle>
          <AlertDialogDescription className="space-y-2">
            <p>{error.message}</p>
            <p className="text-sm text-muted-foreground">
              Would you like to try again? Your progress has been saved.
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onDismiss}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onRetry}>Retry</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}