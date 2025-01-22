// app/api/cron/cleanup/route.ts

import { NextResponse } from "next/server"
import { cleanupService } from "@/lib/cleanup/cleanup-service"
import { storageMonitor } from "@/lib/cleanup/storage-monitor"
import { headers } from "next/headers"

const CLEANUP_SECRET = process.env.CLEANUP_CRON_SECRET

export async function GET(req: Request) {
  try {
    // Verify cron secret for security
    const headersList = headers() // Remove await - headers() is not async
    const authHeader = headersList.get('authorization')
    
    if (!CLEANUP_SECRET || authHeader !== `Bearer ${CLEANUP_SECRET}`) {
      return NextResponse.json({ 
        error: "Unauthorized" 
      }, { status: 401 })
    }

    // Get current storage metrics
    const metrics = await storageMonitor.getStorageMetrics()

    // Run cleanup if needed
    const cleanupResult = await cleanupService.cleanupExpiredGuestData({
      force: req.url.includes('force=true'),
      olderThan: 30 // 30 days
    })

    // Get updated metrics
    const updatedMetrics = await storageMonitor.getStorageMetrics()

    return NextResponse.json({
      success: true,
      cleanupResult,
      metrics: {
        before: metrics,
        after: updatedMetrics
      }
    })

  } catch (error) {
    console.error("[CLEANUP_CRON]", error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Cleanup failed"
    }, { status: 500 })
  }
}

// Prevent the route from being cached
export const dynamic = 'force-dynamic'