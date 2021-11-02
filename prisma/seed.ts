import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const feedback = await prisma.feedback.create({
    data: {
      email: 'test@test.com',
      message: 'Test',
      name: 'Test',
    },
  })
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
