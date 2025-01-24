export interface GuestStorageData {
    guestId: string;
    currentAttemptId: string | null;
    createdAt: number; // timestamp
    expiresAt: number; // timestamp
  }
  
  export interface GuestTestAttemptData {
    attemptId: string;
    testId: string;
    testTitle?: string;
    guestId: string;
    responses: {
      questionId: string;
      selectedOptionId: string;
      pointsEarned: number;
      maxPoints: number;
    }[];
    startedAt: number;
    status: 'IN_PROGRESS' | 'COMPLETED' | 'ABANDONED';
    totalQuestions?: number;
    totalScore?: number;
    percentageScore?: number;
    categoryScores?: {
      categoryId: string;
      actualScore: number;
      maxScale: number;
      rawScore: number;
      maxRawScore: number;
    }[];
  }
  
  export interface StorageKeys {
    GUEST_ID: 'guest_id';
    GUEST_ATTEMPT: 'guest_attempt';
    CURRENT_ATTEMPT: 'current_attempt';
  }
  
  export interface StorageError {
    message: string;
    code: 'STORAGE_FULL' | 'INVALID_DATA' | 'EXPIRED' | 'NOT_FOUND';
  }