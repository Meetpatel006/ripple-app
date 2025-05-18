import { PrismaClient } from '@prisma/client';

// Add prisma to the global type
declare global {
  var prisma: PrismaClient | undefined;
}

// Create a singleton instance of PrismaClient
export const prisma =
  global.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

// In development, we want to use a single instance of PrismaClient across hot reloads
if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

export default prisma;
