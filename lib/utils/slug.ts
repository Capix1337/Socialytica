import { PrismaClient } from '@prisma/client';

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Validate if a string is a valid slug
 */
export function validateSlug(slug: string): boolean {
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
  return slugRegex.test(slug)
}

/**
 * Generate a unique slug for a test
 */
export async function createUniqueSlug(
  title: string,
  prisma: PrismaClient,
  existingId?: string
): Promise<string> {
  const slug = generateSlug(title)
  let iteration = 0
  
  while (true) {
    const currentSlug = iteration === 0 ? slug : `${slug}-${iteration}`
    
    // Check if slug exists
    const existing = await prisma.test.findFirst({
      where: {
        slug: currentSlug,
        // Exclude current test when updating
        ...(existingId && { NOT: { id: existingId } })
      }
    })
    
    if (!existing) return currentSlug
    
    iteration++
  }
}

/**
 * Populate slugs for existing tests
 */
export async function populateExistingSlugs(prisma: PrismaClient): Promise<void> {
  const tests = await prisma.test.findMany({
    where: { slug: null }
  })

  for (const test of tests) {
    const slug = await createUniqueSlug(test.title, prisma, test.id)
    await prisma.test.update({
      where: { id: test.id },
      data: { slug }
    })
  }
}