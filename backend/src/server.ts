import "dotenv/config";
import express from "express";
import mariadb from "mariadb";

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
  let connection;

  try {
    console.log("🔄 Testando conexão com MySQL...");

    const pool = mariadb.createPool({
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT || 3306),
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      connectionLimit: 1,
      connectTimeout: 10000,
    });

    connection = await pool.getConnection();

    console.log("✅ MySQL conectado!");

    const resultado = await connection.query(
      "SELECT 1 AS result"
    );

    console.log("✅ MySQL respondeu:", resultado);

    connection.release();

    await pool.end();
  } catch (error) {
    console.error("❌ Erro ao conectar no MySQL:");
    console.error(error);

    if (connection) {
      connection.release();
    }
  }
}
