import { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://socialytica.net'),
  title: {
    default: "Socialytica | Relationship Psychology Tests & Analysis",
    template: "%s | Socialytica"
  },
  description: "Discover insights about your relationships through scientifically-designed psychological tests",
  openGraph: {
    type: "website",
    title: "Socialytica | Relationship Psychology Tests & Analysis",
    description: "Discover insights about your relationships through scientific tests",
    url: "https://socialytica.net",
    siteName: "Socialytica",
    images: [
      {
        url: "https://socialytica.net/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Socialytica - Relationship Psychology Tests"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Socialytica | Relationship Psychology Tests & Analysis",
    description: "Discover insights about your relationships through scientific tests",
    images: ["https://socialytica.net/twitter-image.jpg"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    }
  },
  verification: {
    google: 'your-actual-google-verification-code',
    yandex: 'your-actual-yandex-verification-code'
  }
}