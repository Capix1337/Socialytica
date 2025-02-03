import { useState } from 'react'
import { Editor } from '@tiptap/react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface LinkDialogProps {
  editor: Editor
  open: boolean
  onClose: () => void
}

export function LinkDialog({ editor, open, onClose }: LinkDialogProps) {
  const [url, setUrl] = useState('')

  const handleSubmit = () => {
    if (url) {
      editor
        .chain()
        .focus()
        .setLink({ href: url })
        .run()
    }
    onClose()
    setUrl('')
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Link</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="url">URL</Label>
            <Input
              id="url"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>Add Link</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}