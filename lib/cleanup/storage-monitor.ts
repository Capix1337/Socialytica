import { cleanupService } from './cleanup-service';
import type { StorageMetrics, MonitoringThresholds } from './types';

const DEFAULT_THRESHOLDS: MonitoringThresholds = {
  maxGuestAttempts: 1000,
  maxStorageUsage: 5 * 1024 * 1024, // 5MB
  cleanupInterval: 24 * 60 * 60 * 1000 // 24 hours
};

export class StorageMonitor {
  private isClient = typeof window !== 'undefined';
  private thresholds: MonitoringThresholds;

  constructor(thresholds?: Partial<MonitoringThresholds>) {
    this.thresholds = { ...DEFAULT_THRESHOLDS, ...thresholds };
  }

  public async getStorageMetrics(): Promise<StorageMetrics> {
    if (!this.isClient) {
      return {
        guestAttempts: 0,
        expiredAttempts: 0,
        storageUsage: 0,
        lastCleanup: 0
      };
    }

    try {
      // Estimate localStorage usage
      const storageUsage = this.calculateLocalStorageUsage();

      // Get guest attempts count from localStorage
      const guestAttempts = this.countGuestAttempts();

      // Get expired attempts count
      const expiredAttempts = this.countExpiredAttempts();

      return {
        guestAttempts,
        expiredAttempts,
        storageUsage,
        lastCleanup: this.getLastCleanupTimestamp()
      };
    } catch (error) {
      console.error('Error getting storage metrics:', error);
      return {
        guestAttempts: 0,
        expiredAttempts: 0,
        storageUsage: 0,
        lastCleanup: 0
      };
    }
  }

  private calculateLocalStorageUsage(): number {
    let total = 0;
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        total += localStorage.getItem(key)?.length || 0;
      }
    }
    return total * 2; // Approximate bytes (2 bytes per character)
  }

  private countGuestAttempts(): number {
    return Object.keys(localStorage)
      .filter(key => key.startsWith('guest_attempt'))
      .length;
  }

  private countExpiredAttempts(): number {
    const now = Date.now();
    return Object.keys(localStorage)
      .filter(key => key.startsWith('guest_attempt'))
      .reduce((count, key) => {
        try {
          const data = JSON.parse(localStorage.getItem(key) || '{}');
          return data.expiresAt && data.expiresAt < now ? count + 1 : count;
        } catch {
          return count;
        }
      }, 0);
  }

  private getLastCleanupTimestamp(): number {
    return parseInt(localStorage.getItem('last_cleanup') || '0', 10);
  }

  private setLastCleanupTimestamp(): void {
    localStorage.setItem('last_cleanup', Date.now().toString());
  }

  public async monitorAndCleanup(): Promise<void> {
    const metrics = await this.getStorageMetrics();
    
    const shouldCleanup = 
      metrics.guestAttempts > this.thresholds.maxGuestAttempts ||
      metrics.storageUsage > this.thresholds.maxStorageUsage ||
      metrics.expiredAttempts > 0;

    if (shouldCleanup) {
      await cleanupService.cleanupExpiredGuestData();
      this.setLastCleanupTimestamp();
    }
  }
}

export const storageMonitor = new StorageMonitor();