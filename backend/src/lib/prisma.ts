import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../generated/prisma/client.js";

// Garante fallback e tipagem correta da porta para o driver mariadb
const port = process.env.DATABASE_PORT ? Number(process.env.DATABASE_PORT) : 3306;

const adapter = new PrismaMariaDb({
  host: process.env.DATABASE_HOST || "127.0.0.1",
  port: port,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  connectionLimit: 5,
  connectTimeout: 10000, // Evita travamentos longos
});

// Padrão Singleton para reuso seguro da conexão em produção
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}