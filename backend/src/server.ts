import "dotenv/config";
import express from "express";
import net from "node:net";

const app = express();

app.get("/", (req, res) => {
  res.json({
    message: "API funcionando!",
  });
});

app.listen(3333, () => {
  console.log("Servidor Rodando na porta 3333!!");

  testarConexaoTCP();
});

function testarConexaoTCP() {
  const host = process.env.DATABASE_HOST;
  const port = Number(process.env.DATABASE_PORT || 3306);

  console.log(`🔄 Testando conexão TCP: ${host}:${port}`);

  const socket = new net.Socket();

  socket.setTimeout(15000);

  socket.on("connect", () => {
    console.log("✅ TCP CONECTOU AO MYSQL!");
    console.log("A Hostinger consegue alcançar o servidor MySQL.");

    socket.destroy();
  });

  socket.on("timeout", () => {
    console.log("❌ TCP TIMEOUT!");
    console.log(
      "A Hostinger não conseguiu estabelecer conexão com o MySQL."
    );

    socket.destroy();
  });

  socket.on("error", (error) => {
    console.log("❌ ERRO TCP:", error.message);

    socket.destroy();
  });

  socket.connect({
    host,
    port,
  });
}