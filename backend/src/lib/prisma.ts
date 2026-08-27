import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client.js";

// Evita recriar o pool de conexões em cada requisição (Singleton Pattern)
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new (PrismaClient as any)();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;