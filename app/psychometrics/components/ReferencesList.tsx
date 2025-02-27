// app/psychometrics/components/ReferencesList.tsx
"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Reference } from "../types/references"

interface ReferencesListProps {
  references: Reference[]
}

export function ReferencesList({ references }: ReferencesListProps) {
  const formatReference = (ref: Reference): string => {
    let citation = `${ref.authors} (${ref.year}). ${ref.title}`

    if ('journal' in ref) {
      citation += `. <i>${ref.journal}</i>${ref.volume ? `, ${ref.volume}` : ''}${ref.pages ? `, ${ref.pages}` : ''}`
    } else if (ref.type === 'bookChapter') {
      citation += `. In ${ref.editor ? `${ref.editor} (Ed.), ` : ''}<i>${ref.bookTitle}</i>${ref.edition ? ` (${ref.edition} ed.)` : ''}${ref.pages ? `, pp. ${ref.pages}` : ''}. ${ref.publisher}`
    } else if (ref.type === 'book') {
      citation += `. ${ref.publisher}`
    }

    citation += '.'
    return citation
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Academic References</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] rounded-md border p-4">
          <div className="space-y-4">
            {references.map((ref, index) => (
              <motion.div
                key={ref.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-sm space-y-1"
              >
                <div className="flex items-start gap-2">
                  <span className="text-muted-foreground">{index + 1}.</span>
                  <p 
                    className="text-foreground"
                    dangerouslySetInnerHTML={{ __html: formatReference(ref) }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}