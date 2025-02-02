export interface AdminDashboardStats {
    overview: {
      totalUsers: number
      totalTests: number
      totalTestAttempts: number
      newUsersToday: number
      newTestsToday: number
    }
    
    // For showing change percentages
    trends: {
      userGrowth: number // percentage
      testGrowth: number // percentage
      attemptGrowth: number // percentage
    }
  }
  
  export interface StatsError {
    message: string
    code: 'FETCH_ERROR' | 'AUTH_ERROR' | 'SERVER_ERROR'
  }
  
  export interface StatsResponse {
    success: boolean
    data?: AdminDashboardStats
    error?: StatsError
  }