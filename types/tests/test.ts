// types/tests/test.ts

import { User } from '@/types'
import { Question } from './question'
// Remove the Category import since we'll define it here
// import { Category } from './category'

export interface Category {
  id: string
  name: string
  scale: number
  description: string | null  // Allow null
  createdAt: Date
  updatedAt: Date
  testId: string
  questions?: Question[]
  _count?: {
    questions: number
  }
}

export interface Test {
  id: string
  title: string
  slug: string 
  description: string | null      // Short description
  richDescription: string | null  // Rich formatted content
  expectedTime: number | null     // Expected duration in minutes
  createdAt: Date
  updatedAt: Date
  isPublished: boolean
  createdBy: string
  authorId?: string  // Make optional
  categories?: Category[]  // Already optional
  user?: User
  questions?: Question[]
  _count?: {
    questions: number
    categories: number
  }
}

// For creating a new test
export interface CreateTestInput {
  id: string
  title: string
  description?: string         // Short description
  richDescription?: string    // Rich formatted content
  expectedTime?: number       // Expected duration in minutes
  isPublished: boolean
  slug?: string
  categories?: Array<{
    name: string
    description?: string
    scale: number
    questions?: Array<{
      title: string
      categoryId?: string
      options?: Array<{
        text: string
        point: number
      }>
    }>
  }>
}

// For updating an existing test
export interface UpdateTestInput {
  id: string
  title?: string
  slug?: string
  description?: string | null        // Short description
  richDescription?: string | null   // Rich formatted content
  expectedTime?: number | null      // Expected duration in minutes
  isPublished?: boolean
  categories?: Array<{
    id?: string
    name: string
    description?: string | null
    scale: number
    questions?: Array<{
      id?: string
      title: string
      categoryId?: string
      options?: Array<{
        id?: string
        text: string
        point: number
      }>
    }>
  }>
}

// For API responses
export interface TestsResponse {
  tests: Test[]
  totalTests: number
  currentPage: number
  totalPages: number
}

// For API error responses
export interface TestError {
  message: string
  errors?: Record<string, string[]>
  slug?: string
}

export type { User }
