//lib/validations/tests.ts

import { z } from "zod"

// Base schemas for reuse
const optionSchema = z.object({
  id: z.string().cuid().optional(),
  text: z.string().min(1, "Option text is required"),
  point: z.number().int().min(0)
})

const questionSchema = z.object({
  id: z.string().cuid().optional(),
  title: z.string().min(1, "Question title is required"),
  options: z.array(optionSchema).min(1, "At least one option is required")
})

export const categorySchema = z.object({
  id: z.string().cuid().optional(),
  name: z.string().min(1, "Category name is required"),
  description: z.string().default(''), // Default to empty string instead of nullable
  scale: z.number().int().min(0),
  questions: z.array(questionSchema).default([])
})

// Add slug validation rules
const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

// Update test creation schema
export const testSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(100, 'Title must be less than 100 characters'),
  slug: z
    .string()
    .regex(slugRegex, "Invalid slug format")
    .optional(), // Optional because we'll generate it
  description: z
    .string()
    .max(500, 'Short description must be less than 500 characters')
    .optional(),
  richDescription: z
    .string()
    .max(65535, 'Test details is too long')
    .optional(),
  expectedTime: z
    .number()
    .int('Expected time must be a whole number')
    .min(1, 'Expected time must be at least 1 minute')
    .max(480, 'Expected time cannot exceed 8 hours')
    .optional()
    .nullable(),
  isPublished: z.boolean().default(false),
  categories: z.array(categorySchema).default([])
})

// Update test update schema
export const updateTestSchema = z.object({
  id: z.string().uuid("Invalid test ID"),
  title: z.string().min(1).max(100).optional(),
  slug: z
    .string()
    .regex(slugRegex, "Invalid slug format")
    .optional(),
  description: z.string().max(500).nullable().optional(),
  richDescription: z
    .string()
    .max(65535)
    .nullable()
    .optional(),
  expectedTime: z
    .number()
    .int('Expected time must be a whole number')
    .min(1, 'Expected time must be at least 1 minute')
    .max(480, 'Expected time cannot exceed 8 hours')
    .nullable()
    .optional(),
  isPublished: z.boolean().optional(),
  categories: z.array(categorySchema).default([])
})

// Types generated from schemas
export type UpdateTestInput = z.infer<typeof updateTestSchema>
export type CategoryInput = z.infer<typeof categorySchema>
export type QuestionInput = z.infer<typeof questionSchema>
export type OptionInput = z.infer<typeof optionSchema>

// For query parameters
export const testQuerySchema = z.object({
  page: z.string().regex(/^\d+$/).optional().default('1'),
  limit: z.string().regex(/^\d+$/).optional().default('10'),
  search: z.string().optional().default(''),
  sort: z.enum(['asc', 'desc']).optional().default('desc'),
  isPublished: z.enum(['true', 'false']).optional()
}).transform(data => ({
  ...data,
  page: data.page ?? '1',
  limit: data.limit ?? '10',
  search: data.search ?? '',
  sort: data.sort ?? 'desc'
}))

export type TestFormValues = z.infer<typeof testSchema>
export type UpdateTestFormValues = z.infer<typeof updateTestSchema>
export type TestQueryParams = z.infer<typeof testQuerySchema>