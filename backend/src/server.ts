import express from "express";
import { prisma } from "./lib/prisma.js";
import { BuscarColaboradorController } from "./controllers/colaborador/BuscarColaboradorController.js";
import { router } from "./routes.js";
const app = express();

app.use(express.json());

// suas rotas
// app.use("/users", userRoutes);
// app.use("/auth", authRoutes);
// etc.
router.get('/colaborador', new BuscarColaboradorController().handle) // ok

app.listen(3333, () => {
  console.log("Servidor Rodando na porta 3333!!");

  testDatabase();
});

async function testDatabase() {
  try {
    console.log("🔄 Testando conexão com MySQL...");

    await prisma.$connect();

    console.log("✅ MySQL conectado!");

    const result = await prisma.$queryRaw`SELECT 1 AS result`;

    console.log("✅ Banco respondeu:", result);
  } catch (error) {
    console.error("❌ Falha no banco:");
    console.error(error);
  }
}
