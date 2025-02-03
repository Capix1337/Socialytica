import { type Editor } from '@tiptap/react'
import { Toggle } from '@/components/ui/toggle'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import {
  Bold, 
  Italic, 
  List, 
  ListOrdered, 
  Image as ImageIcon, 
  Link, 
  Youtube,
  Heading1, 
  Heading2, 
  Heading3, 
  Table, 
  AlignLeft, 
  AlignCenter, 
  AlignRight,
  RowsIcon, 
  Columns // Changed from Column to Columns
} from 'lucide-react'
import { ImageUploadDialog } from './ImageUploadDialog'
import { LinkDialog } from './LinkDialog'
import { YoutubeDialog } from './YoutubeDialog'
import { useState } from 'react'

interface EditorToolbarProps {
  editor: Editor | null
}

export function EditorToolbar({ editor }: EditorToolbarProps) {
  const [showImageDialog, setShowImageDialog] = useState(false)
  const [showLinkDialog, setShowLinkDialog] = useState(false)
  const [showYoutubeDialog, setShowYoutubeDialog] = useState(false)

  if (!editor) return null

  const addTable = () => {
    editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
  }

  const addColumnBefore = () => {
    editor.chain().focus().addColumnBefore().run()
  }

  const addColumnAfter = () => {
    editor.chain().focus().addColumnAfter().run()
  }

  const deleteColumn = () => {
    editor.chain().focus().deleteColumn().run()
  }

  const addRowBefore = () => {
    editor.chain().focus().addRowBefore().run()
  }

  const addRowAfter = () => {
    editor.chain().focus().addRowAfter().run()
  }

  const deleteRow = () => {
    editor.chain().focus().deleteRow().run()
  }

  return (
    <div className="flex flex-wrap gap-2 items-center border rounded-lg p-2">
      <Toggle
        size="sm"
        pressed={editor.isActive('bold')}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold className="h-4 w-4" />
      </Toggle>
      
      <Toggle
        size="sm"
        pressed={editor.isActive('italic')}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic className="h-4 w-4" />
      </Toggle>

      <Separator orientation="vertical" className="h-6" />

      <Toggle
        size="sm"
        pressed={editor.isActive('heading', { level: 1 })}
        onPressedChange={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
      >
        <Heading1 className="h-4 w-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editor.isActive('heading', { level: 2 })}
        onPressedChange={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      >
        <Heading2 className="h-4 w-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editor.isActive('heading', { level: 3 })}
        onPressedChange={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
      >
        <Heading3 className="h-4 w-4" />
      </Toggle>

      <Separator orientation="vertical" className="h-6" />

      <Toggle
        size="sm"
        pressed={editor.isActive('bulletList')}
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List className="h-4 w-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editor.isActive('orderedList')}
        onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered className="h-4 w-4" />
      </Toggle>

      <Separator orientation="vertical" className="h-6" />

      <Button 
        type="button"
        size="sm" 
        variant="ghost" 
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          setShowImageDialog(true)
        }}
      >
        <ImageIcon className="h-4 w-4" />
      </Button>

      <Button 
        type="button"
        size="sm" 
        variant="ghost" 
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          setShowLinkDialog(true)
        }}
      >
        <Link className="h-4 w-4" />
      </Button>

      <Button 
        type="button"
        size="sm" 
        variant="ghost" 
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          setShowYoutubeDialog(true)
        }}
      >
        <Youtube className="h-4 w-4" />
      </Button>

      <Separator orientation="vertical" className="h-6" />

      {/* Text Alignment Controls */}
      <Toggle
        size="sm"
        pressed={editor.isActive({ textAlign: 'left' })}
        onPressedChange={() => editor.chain().focus().setTextAlign('left').run()}
      >
        <AlignLeft className="h-4 w-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editor.isActive({ textAlign: 'center' })}
        onPressedChange={() => editor.chain().focus().setTextAlign('center').run()}
      >
        <AlignCenter className="h-4 w-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editor.isActive({ textAlign: 'right' })}
        onPressedChange={() => editor.chain().focus().setTextAlign('right').run()}
      >
        <AlignRight className="h-4 w-4" />
      </Toggle>

      <Separator orientation="vertical" className="h-6" />
      
      {/* Table Controls */}
      <Button 
        type="button"
        size="sm" 
        variant="ghost" 
        onClick={addTable}
      >
        <Table className="h-4 w-4" />
      </Button>

      {editor.isActive('table') && (
        <>
          <Button
            type="button"
            size="sm"
            variant="ghost"
            onClick={addColumnBefore}
          >
            <Columns className="h-4 w-4 rotate-180" />
          </Button>
          
          <Button
            type="button"
            size="sm"
            variant="ghost"
            onClick={addColumnAfter}
          >
            <Columns className="h-4 w-4" />
          </Button>

          <Button
            type="button"
            size="sm"
            variant="ghost"
            onClick={deleteColumn}
          >
            <Columns className="h-4 w-4 text-destructive" />
          </Button>

          <Button
            type="button"
            size="sm"
            variant="ghost"
            onClick={addRowBefore}
          >
            <RowsIcon className="h-4 w-4 rotate-180" />
          </Button>

          <Button
            type="button"
            size="sm"
            variant="ghost"
            onClick={addRowAfter}
          >
            <RowsIcon className="h-4 w-4" />
          </Button>

          <Button
            type="button"
            size="sm"
            variant="ghost"
            onClick={deleteRow}
          >
            <RowsIcon className="h-4 w-4 text-destructive" />
          </Button>
        </>
      )}

      <ImageUploadDialog
        open={showImageDialog}
        onClose={() => setShowImageDialog(false)}
        editor={editor}
      />

      <LinkDialog
        open={showLinkDialog}
        onClose={() => setShowLinkDialog(false)}
        editor={editor}
      />

      <YoutubeDialog
        open={showYoutubeDialog}
        onClose={() => setShowYoutubeDialog(false)}
        editor={editor}
      />
    </div>
  )
}