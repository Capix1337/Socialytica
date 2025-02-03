import { Mail, Linkedin, Phone, Clock, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"

export function ContactSection() {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-semibold tracking-tight">Contact Information</h2>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-6 space-y-4">
          <h3 className="flex items-center gap-2 font-medium">
            <Clock className="h-5 w-5 text-primary" />
            Support Hours
          </h3>
          <div className="text-sm text-muted-foreground">
            <p>Monday - Friday</p>
            <p>9:00 AM - 6:00 PM (WAT)</p>
          </div>
        </Card>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="space-y-4"
        >
          <Card className="p-6 space-y-4">
            <h3 className="flex items-center gap-2 font-medium">
              <Phone className="h-5 w-5 text-primary" />
              Emergency Contact
            </h3>
            <Button variant="outline" className="w-full justify-start gap-2" asChild>
              <a href="tel:+2349077020150">
                <Phone className="h-4 w-4" />
                +234 907 702 0150
              </a>
            </Button>
          </Card>
        </motion.div>

        <Card className="p-6 space-y-4">
          <h3 className="flex items-center gap-2 font-medium">
            <Mail className="h-5 w-5 text-primary" />
            Email Contact
          </h3>
          <Button variant="outline" className="w-full justify-start gap-2" asChild>
            <a href="mailto:contact@socialytica.com">
              <Mail className="h-4 w-4" />
              chinedu02k@gmail.com
            </a>
          </Button>
        </Card>

        <Card className="p-6 space-y-4">
          <h3 className="flex items-center gap-2 font-medium">
            <MessageSquare className="h-5 w-5 text-primary" />
            WhatsApp
          </h3>
          <Button variant="outline" className="w-full justify-start gap-2" asChild>
            <a href="https://wa.me/2349077020150" target="_blank" rel="noopener noreferrer">
              <MessageSquare className="h-4 w-4" />
              +234 907 702 0150
            </a>
          </Button>
        </Card>

        <Card className="p-6 space-y-4">
          <h3 className="flex items-center gap-2 font-medium">
            <Linkedin className="h-5 w-5 text-primary" />
            Professional Network
          </h3>
          <Button variant="outline" className="w-full justify-start gap-2" asChild>
            <a href="https://linkedin.com/in/masterchinedum" target="_blank" rel="noopener noreferrer">
              <Linkedin className="h-4 w-4" />
              Connect on LinkedIn
            </a>
          </Button>
        </Card>
      </div>
    </section>
  )
}