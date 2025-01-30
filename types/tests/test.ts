// types/tests/test.ts

import { User } from '@/types'
import { Question } from './question'
import { Category } from './category'

export interface Test {
  id: string
  title: string
  slug: string
  description: string | null // Make description nullable here too
  createdAt: Date
  updatedAt: Date
  isPublished: boolean
  authorId: string
  createdBy: string
  user?: User
  questions?: Question[]
  categories: Category[]
  _count?: {
    questions: number;
    categories: number;
  };
}

// For creating a new test
export interface CreateTestInput {
  id: string;
  title: string;
  description?: string;
  isPublished: boolean
  slug?: string
  categories?: Array<{
    name: string;
    description?: string;
    scale: number;
    questions?: Array<{
      title: string;
      categoryId?: string;
      options?: Array<{
        text: string;
        point: number;
      }>;
    }>;
  }>;
}

// For updating an existing test
export interface UpdateTestInput {
  id: string;
  title?: string;
  slug?: string
  description?: string | null;
  isPublished?: boolean;
  categories?: Array<{
    id?: string;
    name: string;
    description?: string | null;
    scale: number;
    questions?: Array<{
      id?: string;
      title: string;
      categoryId?: string;
      options?: Array<{
        id?: string;
        text: string;
        point: number;
      }>;
    }>;
  }>;
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

export interface Category {
  id: string
  name: string
  description: string | null // Make description nullable
  testId: string
  scale: number
  createdAt: Date
  updatedAt: Date
  _count?: {
    questions: number
  }
}

export type { User }
