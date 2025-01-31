import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/dashboard/',
        '/admin/',
        '/_next/',
        '/static/',
        '/*.json$',
        '/*.xml$'
      ]
    },
    sitemap: 'https://socialytica.net/sitemap.xml',
    host: 'https://socialytica.net'
  }
}