import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Youtube from '@tiptap/extension-youtube'
import { EditorToolbar } from './EditorToolbar'
import { cn } from '@/lib/utils'

interface TipTapEditorProps {
  content: string
  onChange: (richText: string) => void
  className?: string
}

export function TipTapEditor({ content, onChange, className }: TipTapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        HTMLAttributes: {
          class: 'rounded-md max-w-full',
        },
      }),
      Link.configure({
        openOnClick: false,
      }),
      Youtube.configure({
        HTMLAttributes: {
          class: 'w-full aspect-video rounded-lg',
        },
      }),
    ],
    content,
    editorProps: {
      attributes: {
        class: cn(
          'prose prose-sm sm:prose-base dark:prose-invert focus:outline-none',
          className
        ),
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    // Add this line to fix the warning
    immediatelyRender: false
  })

  return (
    <div className="flex flex-col gap-4 w-full">
      <EditorToolbar editor={editor} />
      <div className="border rounded-lg p-4">
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}