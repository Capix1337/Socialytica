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

interface YoutubeDialogProps {
  editor: Editor
  open: boolean
  onClose: () => void
}

export function YoutubeDialog({ editor, open, onClose }: YoutubeDialogProps) {
  const [url, setUrl] = useState('')

  const handleSubmit = () => {
    if (url) {
      editor
        .chain()
        .focus()
        .setYoutubeVideo({
          src: url,
        })
        .run()
    }
    onClose()
    setUrl('')
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add YouTube Video</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="youtube">YouTube URL</Label>
            <Input
              id="youtube"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://youtube.com/watch?v=..."
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>Add Video</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}