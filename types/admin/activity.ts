export interface ActivityItem {
    id: string
    type: 'TEST_CREATED' | 'TEST_COMPLETED' | 'USER_REGISTERED' | 'TEST_PUBLISHED'
    userId?: string
    userName?: string
    testId?: string
    testName?: string
    timestamp: Date
    metadata?: Record<string, unknown>
  }
  
  export interface ActivityFeedData {
    activities: ActivityItem[]
    pagination: {
      currentPage: number
      totalPages: number
      totalItems: number
    }
  }
  
  export interface ActivityResponse {
    success: boolean
    data?: ActivityFeedData
    error?: {
      message: string
      code: string
    }
  }