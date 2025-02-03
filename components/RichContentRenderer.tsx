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
    // Initialize embeds after content is rendered
    const initEmbeds = () => {
      // Find all YouTube iframes and ensure they're responsive
      const youtubeFrames = document.querySelectorAll('iframe[data-youtube-video]')
      youtubeFrames.forEach(frame => {
        // Add responsive wrapper if not already wrapped
        if (!frame.parentElement?.classList.contains('youtube-wrapper')) {
          const wrapper = document.createElement('div')
          wrapper.className = 'youtube-wrapper relative w-full pt-[56.25%]' // 16:9 aspect ratio
          frame.parentElement?.insertBefore(wrapper, frame)
          wrapper.appendChild(frame)
          
          // Make iframe fill wrapper
          frame.classList.add('absolute', 'top-0', 'left-0', 'w-full', 'h-full', 'rounded-lg')
        }
      })
    }

    initEmbeds()
  }, [content])

  // Configure DOMPurify to allow YouTube iframes
  const purifyConfig = {
    ADD_TAGS: ['iframe'],
    ADD_ATTR: ['allowfullscreen', 'frameborder', 'src', 'data-youtube-video'],
  }

  return (
    <div 
      className={`prose prose-slate dark:prose-invert max-w-none ${className}`}
      dangerouslySetInnerHTML={{ 
        __html: DOMPurify.sanitize(content, purifyConfig)
      }} 
    />
  )
}