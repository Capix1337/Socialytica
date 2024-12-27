// types/tests/test.ts

import { User } from '@/types'
import { Question } from './question'
import { Category } from './category'

export interface Test {
  id: string
  title: string
  description?: string
  createdAt: Date
  updatedAt: Date
  isPublished: boolean
  createdBy: string
  user?: User
  questions?: Question[]
  categories?: Category[] 
}

// For creating a new test
export interface CreateTestInput {
  id: string;
  title: string;
  description?: string;
  isPublished: boolean;
  categories?: Array<{
    name: string
    description?: string
  }>;
  questions?: Array<{
    title: string;
    categoryId?: string
    options?: Array<{
      text: string;
    }>;
  }>;
}

// For updating an existing test
export interface UpdateTestInput extends Partial<CreateTestInput> {
  id: string
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
}

export type { User }
