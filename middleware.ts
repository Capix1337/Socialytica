import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { analytics } from './utils/analytics'

// Protected routes that require authentication
const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',  // All dashboard routes require auth
  '/profile(.*)'     // Profile routes require auth
])

// Guest-enabled routes (allow both authenticated and guest access)
const isGuestEnabledRoute = createRouteMatcher([
  '/tests/(.*)/attempt/(.*)',  // Test attempt routes
  '/tests/(.*)/results/(.*)'   // Test results routes
])

// Admin only routes
const isAdminRoute = createRouteMatcher([
  '/admindash(.*)'  // All admin dashboard routes
])

export default clerkMiddleware(async (auth, req) => {
  // Analytics tracking
  if (req.nextUrl.pathname === '/') {
    try {
      await analytics.track('pageview', {
        page: '/',
        country: req.headers.get('x-vercel-ip-country') || 'unknown',
      })
    } catch (err) {
      console.error(err)
    }
  }

  // Handle guest-enabled routes
  if (isGuestEnabledRoute(req)) {
    // Allow access regardless of auth state
    return NextResponse.next()
  }

  // Check for protected routes
  if (isProtectedRoute(req)) {
    const { userId, redirectToSignIn } = await auth()
    if (!userId) {
      return redirectToSignIn({ returnBackUrl: req.url })
    }
  }

  // Check for admin routes
  if (isAdminRoute(req)) {
    const { sessionClaims } = await auth()
    if (sessionClaims?.metadata?.role !== 'admin') {
      const url = new URL('/404', req.url)
      return NextResponse.redirect(url)
    }
  }

  // All other routes are public by default
  return NextResponse.next()
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}