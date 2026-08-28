import "dotenv/config";
import express from "express";
import mariadb from "mariadb";

const app = express();

app.get("/", (req, res) => {
  res.json({ message: "API funcionando!" });
});

app.listen(3333, () => {
  console.log("Servidor Rodando na porta 3333!!");
  testarMariaDB();
});

async function testarMariaDB() {
  let connection;

  try {
    console.log("🔄 Testando autenticação MySQL...");

    const pool = mariadb.createPool({
      host: process.env.DATABASE_HOST!,
      port: Number(process.env.DATABASE_PORT || 3306),
      user: process.env.DATABASE_USER!,
      password: process.env.DATABASE_PASSWORD!,
      connectionLimit: 1,
      connectTimeout: 10000,
      acquireTimeout: 10000,
    });

    console.log("🔄 Obtendo conexão...");

    connection = await pool.getConnection();

    console.log("✅ AUTENTICAÇÃO MYSQL FUNCIONOU!");

    const result = await connection.query("SELECT 1 AS result");

    console.log("✅ SELECT FUNCIONOU:", result);

    connection.release();
    await pool.end();
  } catch (error) {
    console.error("❌ FALHA:");
    console.error(error);

    if (connection) {
      connection.release();
    }
  }
}
