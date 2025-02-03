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

  const handleLink = (e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (url) {
      const { from, to } = editor.state.selection
      const isTextSelected = from !== to
      
      if (isTextSelected) {
        // If text is selected, turn it into a link
        editor
          .chain()
          .focus()
          .setLink({ href: url })
          .run()
      } else {
        // If no text is selected, insert the URL as both text and link
        editor
          .chain()
          .focus()
          .insertContent(`<a href="${url}">${url}</a>`)
          .run()
      }
    }
    onClose()
    setUrl('')
  }

  return (
    <Dialog 
      open={open} 
      onOpenChange={onClose}
    >
      <DialogContent 
        onPointerDownCapture={(e) => e.stopPropagation()}
      >
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
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  e.stopPropagation()
                  handleLink(e)
                }
              }}
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button 
              type="button"
              variant="outline" 
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                onClose()
              }}
            >
              Cancel
            </Button>
            <Button 
              type="button"
              onClick={handleLink}
            >
              Add Link
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}