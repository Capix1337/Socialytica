import { v4 as uuidv4 } from 'uuid';
import type { GuestStorageData, GuestTestAttemptData, StorageError } from './types';

const STORAGE_KEYS = {
  GUEST_ID: 'guest_id',
  GUEST_ATTEMPT: 'guest_attempt',
  CURRENT_ATTEMPT: 'current_attempt',
} as const;

const EXPIRATION_DAYS = 30;

export class GuestStorage {
  private getExpirationDate(): number {
    return Date.now() + (EXPIRATION_DAYS * 24 * 60 * 60 * 1000);
  }

  private isExpired(timestamp: number): boolean {
    return Date.now() > timestamp;
  }

  /**
   * Initialize or retrieve guest ID
   */
  public initGuest(): GuestStorageData {
    try {
      const existingData = localStorage.getItem(STORAGE_KEYS.GUEST_ID);
      
      if (existingData) {
        const parsedData: GuestStorageData = JSON.parse(existingData);
        if (!this.isExpired(parsedData.expiresAt)) {
          return parsedData;
        }
      }

      // Create new guest data
      const newData: GuestStorageData = {
        guestId: uuidv4(),
        currentAttemptId: null,
        createdAt: Date.now(),
        expiresAt: this.getExpirationDate()
      };

      localStorage.setItem(STORAGE_KEYS.GUEST_ID, JSON.stringify(newData));
      return newData;

    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Save guest test attempt
   */
  public saveAttempt(attemptData: GuestTestAttemptData): void {
    try {
      const key = `${STORAGE_KEYS.GUEST_ATTEMPT}_${attemptData.attemptId}`;
      localStorage.setItem(key, JSON.stringify(attemptData));
      
      // Update current attempt reference
      const guestData = this.getGuestData();
      if (guestData) {
        guestData.currentAttemptId = attemptData.attemptId;
        localStorage.setItem(STORAGE_KEYS.GUEST_ID, JSON.stringify(guestData));
      }
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Get guest attempt by ID
   */
  public getAttempt(attemptId: string): GuestTestAttemptData | null {
    try {
      const key = `${STORAGE_KEYS.GUEST_ATTEMPT}_${attemptId}`;
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Get current guest data
   */
  public getGuestData(): GuestStorageData | null {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.GUEST_ID);
      if (!data) return null;

      const parsedData: GuestStorageData = JSON.parse(data);
      if (this.isExpired(parsedData.expiresAt)) {
        this.clearGuestData();
        return null;
      }

      return parsedData;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Clear all guest data
   */
  public clearGuestData(): void {
    try {
      const guestData = this.getGuestData();
      if (guestData?.currentAttemptId) {
        localStorage.removeItem(
          `${STORAGE_KEYS.GUEST_ATTEMPT}_${guestData.currentAttemptId}`
        );
      }
      localStorage.removeItem(STORAGE_KEYS.GUEST_ID);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Handle storage errors
   */
  private handleError(error: unknown): StorageError {
    if (error instanceof Error) {
      // Handle storage quota exceeded
      if (error.name === 'QuotaExceededError') {
        return {
          message: 'Storage quota exceeded',
          code: 'STORAGE_FULL'
        };
      }
      // Handle JSON parsing errors
      if (error instanceof SyntaxError) {
        return {
          message: 'Invalid storage data',
          code: 'INVALID_DATA'
        };
      }
    }
    // Generic error
    return {
      message: 'Storage operation failed',
      code: 'INVALID_DATA'
    };
  }
}

// Export singleton instance
export const guestStorage = new GuestStorage();