// app/psychometrics/components/SubAreaRow.tsx
"use client"

import { motion } from "framer-motion"
import { Info } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface SubAreaRowProps {
  name: string
  items: string
  reliability: string
  testRetest: string
  description: string
  index: number
}

export function SubAreaRow({
  name,
  items,
  reliability,
  testRetest,
  description,
  index,
}: SubAreaRowProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 hover:bg-muted/50 rounded-lg"
    >
      <div className="md:col-span-3">
        <h4 className="font-medium text-base">{name}</h4>
        <div className="text-sm text-muted-foreground">
          {items} items
        </div>
      </div>
      
      <div className="md:col-span-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Reliability</span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Internal consistency measure (Cronbach&apos;s α)</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="text-sm text-muted-foreground">{reliability}</div>
      </div>

      <div className="md:col-span-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Test-Retest</span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Temporal stability coefficient</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="text-sm text-muted-foreground">{testRetest}</div>
      </div>

      <div className="md:col-span-5">
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </motion.div>
  )
}