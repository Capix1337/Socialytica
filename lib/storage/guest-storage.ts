import { v4 as uuidv4 } from 'uuid';
import type { GuestStorageData, GuestTestAttemptData, StorageError } from './types';

const STORAGE_KEYS = {
  GUEST_ID: 'guest_id',
  GUEST_ATTEMPT: 'guest_attempt',
  CURRENT_ATTEMPT: 'current_attempt',
} as const;

const EXPIRATION_DAYS = 30;

export class GuestStorage {
  private isClient = typeof window !== 'undefined';

  private getExpirationDate(): number {
    return Date.now() + (EXPIRATION_DAYS * 24 * 60 * 60 * 1000);
  }

  private isExpired(timestamp: number): boolean {
    return Date.now() > timestamp;
  }

  // Get or create guest ID
  public getGuestId(): string {
    if (!this.isClient) return '';
    
    const existingData = localStorage.getItem(STORAGE_KEYS.GUEST_ID);
    if (existingData) {
      const data = JSON.parse(existingData);
      if (data.expiresAt > Date.now()) {
        return data.guestId;
      }
    }
    
    const newData: GuestStorageData = {
      guestId: uuidv4(),
      currentAttemptId: null,
      createdAt: Date.now(),
      expiresAt: Date.now() + (30 * 24 * 60 * 60 * 1000) // 30 days
    };
    
    localStorage.setItem(STORAGE_KEYS.GUEST_ID, JSON.stringify(newData));
    return newData.guestId;
  }

  // Add method to get current attempt
  public getCurrentAttempt(testId: string): GuestTestAttemptData | null {
    if (!this.isClient) return null;

    try {
      const guestData = this.getGuestData();
      if (!guestData?.currentAttemptId) return null;

      const attempt = this.getAttempt(guestData.currentAttemptId);
      if (!attempt || attempt.testId !== testId) return null;

      // Check if attempt is expired
      if (this.isAttemptExpired(attempt)) {
        this.clearAttempt(attempt.attemptId);
        return null;
      }

      return attempt;
    } catch (error) {
      console.error('Storage operation failed:', error);
      return null;
    }
  }

  // Add method to check attempt expiration
  private isAttemptExpired(attempt: GuestTestAttemptData): boolean {
    const expirationTime = attempt.startedAt + (30 * 24 * 60 * 60 * 1000); // 30 days
    return Date.now() > expirationTime;
  }

  // Add method to clear specific attempt
  public clearAttempt(attemptId: string): void {
    if (!this.isClient) return;

    try {
      const key = `${STORAGE_KEYS.GUEST_ATTEMPT}_${attemptId}`;
      localStorage.removeItem(key);

      // Update current attempt reference if needed
      const guestData = this.getGuestData();
      if (guestData?.currentAttemptId === attemptId) {
        guestData.currentAttemptId = null;
        localStorage.setItem(STORAGE_KEYS.GUEST_ID, JSON.stringify(guestData));
      }
    } catch (error) {
      console.error('Storage operation failed:', error);
    }
  }

  /**
   * Initialize or retrieve guest ID
   */
  public initGuest(): GuestStorageData | null {
    if (!this.isClient) return null;

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
      console.error('Storage operation failed:', error);
      return null;
    }
  }

  /**
   * Save guest test attempt
   */
  public saveAttempt(attemptData: GuestTestAttemptData): void {
    if (!this.isClient) return;

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
      console.error('Storage operation failed:', error);
    }
  }

  /**
   * Save guest response
   */
  public saveGuestResponse(
    attemptId: string,
    questionId: string,
    selectedOptionId: string,
    pointsEarned: number,
    maxPoints: number
  ): void {
    if (!this.isClient) return

    try {
      // Get current attempt data
      const key = `guest_attempt_${attemptId}`
      const attemptData = this.getAttempt(attemptId)

      if (attemptData) {
        // Update or add the response
        const existingResponseIndex = attemptData.responses.findIndex(
          r => r.questionId === questionId
        )

        if (existingResponseIndex > -1) {
          attemptData.responses[existingResponseIndex] = {
            questionId,
            selectedOptionId,
            pointsEarned,
            maxPoints
          }
        } else {
          attemptData.responses.push({
            questionId,
            selectedOptionId,
            pointsEarned,
            maxPoints
          })
        }

        // Save updated attempt data
        localStorage.setItem(key, JSON.stringify(attemptData))
      }
    } catch (error) {
      console.error('Storage operation failed:', error)
    }
  }

  /**
   * Get guest attempt by ID
   */
  public getAttempt(attemptId: string): GuestTestAttemptData | null {
    if (!this.isClient) return null

    try {
      const key = `guest_attempt_${attemptId}`
      const data = localStorage.getItem(key)
      return data ? JSON.parse(data) : null
    } catch (error) {
      console.error('Storage operation failed:', error)
      return null
    }
  }

  /**
   * Get current guest data
   */
  public getGuestData(): GuestStorageData | null {
    if (!this.isClient) return null;

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
      console.error('Storage operation failed:', error);
      return null;
    }
  }

  /**
   * Clear all guest data
   */
  public clearGuestData(): void {
    if (!this.isClient) return;

    try {
      const guestData = this.getGuestData();
      if (guestData?.currentAttemptId) {
        localStorage.removeItem(
          `${STORAGE_KEYS.GUEST_ATTEMPT}_${guestData.currentAttemptId}`
        );
      }
      localStorage.removeItem(STORAGE_KEYS.GUEST_ID);
    } catch (error) {
      console.error('Storage operation failed:', error);
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