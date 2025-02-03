"use client"

import { motion } from "framer-motion"
import { HelpHeader } from "./components/HelpHeader"
import { ContactSection } from "./components/ContactSection"
import { fadeIn } from "../components/transitions"

const HelpPage = () => {
  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <motion.div
        className="space-y-8"
        {...fadeIn}
      >
        <HelpHeader />
        
        <section className="prose dark:prose-invert max-w-none">
          <p className="text-lg text-muted-foreground">
            Welcome to the Admin Help Center. As an administrator of our platform, 
            I understand the importance of your role and are here to provide you 
            with the support you need. If you encounter any issues or have 
            questions about managing the platform, please don&apos;t hesitate to reach 
            out.
          </p>
        </section>

        <ContactSection />
      </motion.div>
    </div>
  )
}

export default HelpPage