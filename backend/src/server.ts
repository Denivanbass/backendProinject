import express from "express";
import { prisma } from "./lib/prisma.js";

const app = express();

try {
  console.log("🔄 Conectando ao MySQL...");

  await prisma.$connect();

  console.log("✅ MySQL conectado!");

  const result = await prisma.$queryRaw`SELECT 1 AS result`;

  console.log("✅ Banco respondeu:", result);
} catch (error) {
  console.error("❌ Falha no banco:");
  console.error(error);
}

app.listen(3333, () => {
  console.log("Servidor Rodando na porta 3333!!");
});
