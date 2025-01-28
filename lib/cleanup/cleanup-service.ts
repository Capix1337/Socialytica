import prisma from '@/lib/prisma';
import { guestStorage } from '@/lib/storage/guest-storage';
import type { CleanupResult, CleanupOptions } from './types';
import { logger } from '@/lib/logger';
import type { TestStatus } from '@/types/tests/test-attempt.ts';

export class CleanupService {
  private readonly BATCH_SIZE = 100;

  async cleanupExpiredGuestData(options: CleanupOptions = {}): Promise<CleanupResult> {
    try {
      logger.info('Starting cleanup process', { options });
      const startTime = Date.now();

      const cutoffDate = new Date();
      const daysToSubtract = options.olderThan || 30;
      cutoffDate.setDate(cutoffDate.getDate() - daysToSubtract);

      let totalDeleted = 0;
      let hasMore = true;
      let page = 0;

      while (hasMore) {
        const result = await prisma.$transaction(async (tx) => {
          const expiredAttempts = await tx.guestAttempt.findMany({
            where: {
              OR: [
                { expiresAt: { lt: new Date() } },
                { createdAt: { lt: cutoffDate } }
              ]
            },
            select: { id: true, guestId: true },
            take: this.BATCH_SIZE,
            skip: page * this.BATCH_SIZE
          });

          if (options.dryRun) {
            return { count: expiredAttempts.length, attempts: expiredAttempts };
          }

          const { count } = await tx.guestAttempt.deleteMany({
            where: {
              id: { in: expiredAttempts.map(a => a.id) }
            }
          });

          return { count, attempts: expiredAttempts };
        });

        hasMore = result.attempts.length === this.BATCH_SIZE;
        page++;
        totalDeleted += result.count;

        // Clean local storage
        for (const attempt of result.attempts) {
          try {
            if (attempt.guestId) {
              const guestData = guestStorage.getGuestData();
              if (guestData?.guestId === attempt.guestId) {
                guestStorage.clearGuestData();
              }
            }
          } catch (error) {
            logger.error('Error clearing localStorage', { 
              guestId: attempt.guestId,
              error: error instanceof Error ? error.message : 'Unknown error'
            });
          }
        }
      }

      const duration = Date.now() - startTime;
      logger.info('Cleanup completed', { totalDeleted, duration });

      return {
        success: true,
        deletedCount: totalDeleted,
        duration
      };

    } catch (error) {
      logger.error('Cleanup failed', { 
        error: error instanceof Error ? error.message : 'Unknown error' 
      });
      return {
        success: false,
        deletedCount: 0,
        error: error instanceof Error ? error.message : 'Unknown error during cleanup'
      };
    }
  }

  public async recoverInterruptedCleanups(): Promise<void> {
    try {
      logger.info('Starting recovery of interrupted cleanups');
      const incompleteCleanups = await prisma.guestAttempt.findMany({
        where: {
          status: 'CLEANUP_PENDING' as TestStatus
        }
      });

      for (const cleanup of incompleteCleanups) {
        await this.cleanupExpiredGuestData({
          olderThan: 0,
          specificIds: [cleanup.id]
        });
      }
    } catch (error) {
      logger.error('Recovery failed', { 
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      throw error;
    }
  }
}

export const cleanupService = new CleanupService();