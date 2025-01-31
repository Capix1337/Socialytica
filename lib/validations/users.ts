// lib/validations/users.ts
import { z } from "zod"

export const userQuerySchema = z.object({
  page: z.string().default("1"),
  limit: z.string().default("10"),
  search: z.string().default(""),
  country: z.string().optional(),
  sort: z.enum(["asc", "desc"]).default("desc")
})