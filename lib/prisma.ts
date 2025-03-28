import { PrismaClient } from '@prisma/client'

// Create the PrismaClient instance
const prismaClientSingleton = () => {
  return new PrismaClient({
    log: ['info', 'warn', 'error']
  })
}

// Properly extend globalThis type
declare global {
  // eslint-disable-next-line no-var
  var prisma: ReturnType<typeof prismaClientSingleton> | undefined
}

// Export the client as both default and named export
const prisma = globalThis.prisma ?? prismaClientSingleton()
export default prisma

// For backwards compatibility with your existing code
export const db = prisma

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma

// You can add helper functions here similar to the example
// export async function updateUserProfile(...) { ... }