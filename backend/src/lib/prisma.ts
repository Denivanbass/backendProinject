import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client.js";

// Padrão Singleton para evitar estourar o limite de conexões em produção
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new (PrismaClient as any)();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;