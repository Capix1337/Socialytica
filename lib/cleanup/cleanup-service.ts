import prisma from '@/lib/prisma';
import { guestStorage } from '@/lib/storage/guest-storage';
import type { CleanupResult, CleanupOptions } from './types';
import { logger } from '@/lib/logger';

export class CleanupService {
  private readonly BATCH_SIZE = 100;

  async cleanupExpiredGuestData(options: CleanupOptions = {}): Promise<CleanupResult> {
    try {
      logger.info('Starting cleanup process', { options: JSON.stringify(options) });
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

        for (const attempt of result.attempts) {
          try {
            if (attempt.guestId) {
              await this.cleanupGuestStorage(attempt.guestId);
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
      logger.error('Cleanup error', { 
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      return {
        success: false,
        deletedCount: 0,
        error: error instanceof Error ? error.message : 'Unknown error during cleanup'
      };
    }
  }

  private async cleanupGuestStorage(guestId: string): Promise<boolean> {
    try {
      const beforeCleanup = guestStorage.getGuestData();
      if (beforeCleanup?.guestId === guestId) {
        guestStorage.clearGuestData();
        
        const afterCleanup = guestStorage.getGuestData();
        if (afterCleanup?.guestId === guestId) {
          throw new Error('Storage cleanup verification failed');
        }
      }
      return true;
    } catch (error) {
      logger.error('Storage cleanup failed', { 
        guestId,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      throw error;
    }
  }

  public async recoverInterruptedCleanups(): Promise<void> {
    try {
      logger.info('Starting recovery of interrupted cleanups');
      const incompleteCleanups = await prisma.guestAttempt.findMany({
        where: {
          status: { equals: 'CLEANUP_PENDING' }
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