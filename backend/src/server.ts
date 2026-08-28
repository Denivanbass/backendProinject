import express from "express";
import net from "node:net";

const app = express();

app.get("/", (req, res) => {
  res.json({ message: "API funcionando!" });
});

app.listen(3333, () => {
  console.log("Servidor Rodando na porta 3333!!");
  testarMySQL();
});

function testarMySQL() {
  const socket = new net.Socket();

  socket.setTimeout(10000);

  socket.on("connect", () => {
    console.log("✅ TCP conectado!");
    console.log("⏳ Aguardando resposta do servidor MySQL...");

    socket.once("data", (data) => {
      console.log("📦 Resposta recebida do MySQL:");
      console.log(data.toString("hex"));

      socket.destroy();
    });
  });

  socket.on("timeout", () => {
    console.log("❌ TIMEOUT aguardando resposta do MySQL");
    socket.destroy();
  });

  socket.on("error", (error) => {
    console.log("❌ ERRO:", error.message);
  });

  socket.connect({
    host: process.env.DATABASE_HOST || "srv540.hstgr.io",
    port: Number(process.env.DATABASE_PORT || 3306),
  });
}

