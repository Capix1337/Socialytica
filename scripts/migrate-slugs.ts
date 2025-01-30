// scripts/migrate-slugs.ts
import prisma from '../lib/prisma'
import { populateExistingSlugs } from '../lib/utils/slug'

async function main() {
  try {
    console.log('Starting slug migration...')
    await populateExistingSlugs(prisma)
    console.log('Slug migration completed successfully')
  } catch (error) {
    console.error('Error during slug migration:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()