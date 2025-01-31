// components/SyncStatus.tsx
import { formatDistanceToNow } from 'date-fns'

interface SyncStatusProps {
  lastSaved: Date | null
  pendingChanges: number
}

export function SyncStatus({ lastSaved, pendingChanges }: SyncStatusProps) {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-500">
      {lastSaved && (
        <span>Last saved: {formatDistanceToNow(lastSaved, { addSuffix: true })}</span>
      )}
      {pendingChanges > 0 && (
        <span>
          {pendingChanges} unsaved {pendingChanges === 1 ? 'change' : 'changes'}
        </span>
      )}
    </div>
  )
}