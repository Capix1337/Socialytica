// types/tests/category.ts
import { Question } from './question'

export interface Category {
  id: string
  name: string
  scale: number
  description: string | null  // Update this to allow null
  createdAt: Date
  updatedAt: Date
  testId: string
  questions?: Question[]
  _count?: {
    questions: number
  }
}

export interface CreateCategoryPayload {
    name: string
    description: string // Changed from optional to required
    scale: number
    testId: string
}

export interface UpdateCategoryPayload {
    name?: string
    description?: string // Keep this optional for updates
    scale?: number
}

export interface CategoryError {
    message: string
    errors?: Record<string, string[]>
}