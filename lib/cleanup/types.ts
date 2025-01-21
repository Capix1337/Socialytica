export interface CleanupResult {
  success: boolean;
  deletedCount: number;
  error?: string;
}

export interface StorageMetrics {
  guestAttempts: number;
  expiredAttempts: number;
  storageUsage: number; // in bytes
  lastCleanup: number; // timestamp
}

export interface CleanupOptions {
  force?: boolean;        // Force cleanup regardless of time
  dryRun?: boolean;       // Only report what would be deleted
  olderThan?: number;     // Delete items older than X days
}

export interface MonitoringThresholds {
  maxGuestAttempts: number;
  maxStorageUsage: number; // in bytes
  cleanupInterval: number; // in milliseconds
}