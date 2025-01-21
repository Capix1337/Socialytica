import prisma from '@/lib/prisma';
import { guestStorage } from '@/lib/storage/guest-storage';
import type { CleanupResult, CleanupOptions } from './types';

export class CleanupService {
  async cleanupExpiredGuestData(options: CleanupOptions = {}): Promise<CleanupResult> {
    try {
      // Calculate cutoff date
      const cutoffDate = new Date();
      const daysToSubtract = options.olderThan || 30;
      cutoffDate.setDate(cutoffDate.getDate() - daysToSubtract);

      // Find expired attempts
      const expiredAttempts = await prisma.guestAttempt.findMany({
        where: {
          OR: [
            { expiresAt: { lt: new Date() } },
            { createdAt: { lt: cutoffDate } }
          ]
        },
        select: { id: true, guestId: true }
      });

      if (options.dryRun) {
        return {
          success: true,
          deletedCount: expiredAttempts.length,
        };
      }

      // Delete from database
      const { count } = await prisma.guestAttempt.deleteMany({
        where: {
          id: { in: expiredAttempts.map(a => a.id) }
        }
      });

      // Clean local storage for each guest ID
      expiredAttempts.forEach(attempt => {
        try {
          if (attempt.guestId) {
            const guestData = guestStorage.getGuestData();
            if (guestData?.guestId === attempt.guestId) {
              guestStorage.clearGuestData();
            }
          }
        } catch (error) {
          console.error('Error clearing localStorage:', error);
        }
      });

      return {
        success: true,
        deletedCount: count
      };

    } catch (error) {
      console.error('Cleanup error:', error);
      return {
        success: false,
        deletedCount: 0,
        error: error instanceof Error ? error.message : 'Unknown error during cleanup'
      };
    }
  }
}

export const cleanupService = new CleanupService();