export interface PerformanceMetric {
    testCompletionRate: {
      current: number
      previous: number
      trend: number // percentage change
    }
    userEngagement: {
      activeUsers: number
      averageTestsPerUser: number
      returningUsers: number
    }
    testPerformance: {
      averageScore: number
      completionTime: number // in minutes
      popularTests: Array<{
        id: string
        title: string
        attempts: number
        averageScore: number
      }>
    }
  }
  
  export interface PerformanceTimeframe {
    start: Date
    end: Date
    period: 'day' | 'week' | 'month' | 'year'
  }
  
  export interface PerformanceResponse {
    success: boolean
    data?: PerformanceMetric
    error?: {
      message: string
      code: string
    }
    timeframe: PerformanceTimeframe
  }