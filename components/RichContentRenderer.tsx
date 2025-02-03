// components/RichContentRenderer.tsx
"use client"

import { useEffect } from 'react'
import DOMPurify from 'isomorphic-dompurify'

interface RichContentRendererProps {
  content: string
  className?: string
}

export function RichContentRenderer({ content, className }: RichContentRendererProps) {
  useEffect(() => {
    // Initialize any client-side components (e.g., YouTube embeds)
    const initEmbeds = () => {
      // YouTube iframe API setup if needed
    }
    initEmbeds()
  }, [content])

  return (
    <div 
      className={`prose prose-slate dark:prose-invert max-w-none ${className}`}
      dangerouslySetInnerHTML={{ 
        __html: DOMPurify.sanitize(content)
      }} 
    />
  )
}