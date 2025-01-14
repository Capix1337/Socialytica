// components/footer.tsx
import Link from "next/link"
import { 
  Twitter, 
  Linkedin, 
  Facebook, 
  Instagram
} from "lucide-react"
import { Button } from "@/components/ui/button"

const navigation = {
  discover: [
    { name: 'Our Framework', href: '/framework' },
    { name: 'Psychometrics', href: '/psychometrics' },
    { name: 'Research & Development', href: '/research' },
    { name: 'Historical Insights', href: '/insights' },
    { name: 'Relationship Science Blog', href: '/blog' }
  ],
  support: [
    { name: 'FAQ', href: '/faq' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'Community Forum', href: '/forum' },
    { name: 'Guides & Resources', href: '/resources' },
    { name: 'Customer Support', href: '/support' }
  ],
  social: [
    { name: 'Facebook', href: '#', icon: Facebook },
    { name: 'Instagram', href: '#', icon: Instagram },
    { name: 'Twitter', href: '#', icon: Twitter },
    { name: 'LinkedIn', href: '#', icon: Linkedin }
  ]
}

export function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container px-4 py-12 md:py-16 max-w-7xl mx-auto">
        {/* Main Footer Sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 justify-items-center md:justify-items-stretch">
          {/* Discover Section */}
          <div className="space-y-4 w-full max-w-xs text-center md:text-left">
            <h3 className="text-lg font-semibold">Discover</h3>
            <ul className="space-y-3">
              {navigation.discover.map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Section */}
          <div className="space-y-4 w-full max-w-xs text-center md:text-left">
            <h3 className="text-lg font-semibold">Support</h3>
            <ul className="space-y-3">
              {navigation.support.map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Engage Section */}
          <div className="space-y-4 w-full max-w-xs text-center md:text-left">
            <h3 className="text-lg font-semibold">Engage</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/feedback" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Feedback
                </Link>
              </li>
              <li>
                <Link href="/collaborations" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Collaborations
                </Link>
              </li>
              <li>
                <Link href="/newsletter" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Newsletter Subscription
                </Link>
              </li>
              <li>
                <span className="text-sm text-muted-foreground block mb-2">Social Media</span>
                <div className="flex justify-center md:justify-start space-x-4">
                  {navigation.social.map((item) => (
                    <Button 
                      key={item.name} 
                      variant="ghost" 
                      size="icon"
                      className="hover:text-primary h-8 w-8"
                      asChild
                    >
                      <a href={item.href} target="_blank" rel="noopener noreferrer">
                        <item.icon className="h-4 w-4" />
                        <span className="sr-only">{item.name}</span>
                      </a>
                    </Button>
                  ))}
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground order-2 md:order-1">
              ©2024-2025 Socialytic Limited
            </p>
            <div className="flex space-x-6 order-1 md:order-2">
              <Link 
                href="/terms" 
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Terms & Conditions
              </Link>
              <Link 
                href="/privacy" 
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}