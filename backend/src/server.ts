import "dotenv/config";
import express from "express";
import mariadb from "mariadb";

const app = express();

app.get("/", (req, res) => {
  res.json({
    message: "API funcionando!",
  });
});

app.listen(3333, () => {
  console.log("Servidor Rodando na porta 3333!!");
  testarMariaDB();
});

async function testarMariaDB() {
  let connection;

  try {
    console.log("🔄 Abrindo conexão direta...");

    connection = await mariadb.createConnection({
      host: process.env.DATABASE_HOST!,
      port: Number(process.env.DATABASE_PORT || 3306),
      user: process.env.DATABASE_USER!,
      password: process.env.DATABASE_PASSWORD!,
      database: process.env.DATABASE_NAME!,
      connectTimeout: 15000,
    });

    console.log("✅ CONEXÃO DIRETA FUNCIONOU!");

    const result = await connection.query(
      "SELECT 1 AS result"
    );

    console.log("✅ SELECT FUNCIONOU:", result);

  } catch (error) {
    console.error("❌ ERRO NA CONEXÃO DIRETA:");
    console.error(error);

  } finally {
    if (connection) {
      await connection.end();
    }
  }
}
