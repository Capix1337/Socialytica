// app/psychometrics/components/ReferencesList.tsx
"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Reference {
  id: string
  authors: string
  year: number
  title: string
  journal: string
  volume?: string
  pages?: string
  doi?: string
}

interface ReferencesListProps {
  references: Reference[]
}

export function ReferencesList({ references }: ReferencesListProps) {
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
                  <p className="text-foreground">
                    {ref.authors} ({ref.year}). {ref.title}. <i>{ref.journal}</i>
                    {ref.volume && <>, {ref.volume}</>}
                    {ref.pages && <>, {ref.pages}</>}.
                    {ref.doi && (
                      <a
                        href={`https://doi.org/${ref.doi}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-2 text-primary hover:underline"
                      >
                        https://doi.org/{ref.doi}
                      </a>
                    )}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}