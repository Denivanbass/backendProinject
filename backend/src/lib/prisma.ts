import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client.js";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Passa um objeto vazio com cast para satisfazer os tipos do Prisma v7 
// e utilizar a engine nativa via DATABASE_URL
export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({} as any);

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;