export interface CleanupResult {
  success: boolean;
  deletedCount: number;
  error?: string;
  duration?: number; // Add duration to the interface
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
  specificIds?: string[]; // Add specificIds to the interface
}

export interface MonitoringThresholds {
  maxGuestAttempts: number;
  maxStorageUsage: number; // in bytes
  cleanupInterval: number; // in milliseconds
}

// Add this if you're using it with Prisma
export type TestStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CLEANUP_PENDING';