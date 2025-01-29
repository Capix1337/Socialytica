// scripts/migrate-slugs.ts
import { PrismaClient } from '@prisma/client'
import { createUniqueSlug } from '../lib/utils/slug'

const prisma = new PrismaClient()

async function migrateSlugs() {
  try {
    console.log('Starting slug migration...')
    
    const tests = await prisma.test.findMany({
      where: {
        OR: [
          { slug: null },
          { slug: '' }
        ]
      }
    })

    console.log(`Found ${tests.length} tests to migrate`)

    for (const test of tests) {
      const slug = await createUniqueSlug(test.title, prisma, test.id)
      await prisma.test.update({
        where: { id: test.id },
        data: { slug }
      })
      console.log(`Generated slug "${slug}" for test "${test.title}"`)
    }

    console.log('Migration completed successfully')
  } catch (error) {
    console.error('Migration failed:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

migrateSlugs()