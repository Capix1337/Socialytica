// lib/errors/attempt-errors.ts

export class AttemptError extends Error {
    constructor(
      message: string,
      public code: string,
      public recoverable: boolean = true,
      public details?: unknown
    ) {
      super(message)
      this.name = 'AttemptError'
    }
  }
  
  export const AttemptErrorCodes = {
    NETWORK_ERROR: 'NETWORK_ERROR',
    SYNC_FAILED: 'SYNC_FAILED',
    SESSION_EXPIRED: 'SESSION_EXPIRED',
    STATE_CORRUPTED: 'STATE_CORRUPTED',
  } as const
  
  export class AttemptErrorBoundary {
    static handleError(error: unknown): AttemptError {
      if (error instanceof AttemptError) {
        return error
      }
  
      if (error instanceof Error) {
        if (error.message.includes('network')) {
          return new AttemptError(
            'Network connection lost',
            AttemptErrorCodes.NETWORK_ERROR,
            true
          )
        }
      }
  
      return new AttemptError(
        'An unexpected error occurred',
        'UNKNOWN_ERROR',
        true
      )
    }
  }