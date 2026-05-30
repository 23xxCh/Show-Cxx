// Prisma 客户端
// 注意：需要先配置 .env 文件中的 DATABASE_URL，然后运行 npx prisma generate

let prisma: any

if (process.env.DATABASE_URL) {
  // 只有配置了数据库连接时才初始化 Prisma
  const { PrismaClient } = require('@prisma/client')
  const globalForPrisma = globalThis as unknown as { prisma: any }
  prisma = globalForPrisma.prisma ?? new PrismaClient()
  if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prisma
  }
}

export { prisma }
