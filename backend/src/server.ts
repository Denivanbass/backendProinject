import "dotenv/config";
import express from "express";
import { prisma } from "./lib/prisma.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "API funcionando!",
  });
});

app.listen(3333, () => {
  console.log("Servidor Rodando na porta 3333!!");

  testarBanco();
});

async function testarBanco() {
  try {
    console.log("🔄 Conectando ao MySQL...");

    await prisma.$connect();

    console.log("✅ Prisma conectado!");

    console.log("🔄 Executando SELECT 1...");

    const resultado = await prisma.$queryRaw`
      SELECT 1 AS result
    `;

    console.log("✅ Banco respondeu:", resultado);
  } catch (error) {
    console.error("❌ Erro no banco:");
    console.error(error);
  }
}
