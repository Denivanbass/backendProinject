// Arquivo Servidor
import express from 'express';
import { router } from './routes.js';
import cors from 'cors';
import path from 'path';
const app = express();
app.use(express.json());
app.use(cors());
app.use(router);
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));
app.use((err, req, res, next) => {
    if (err instanceof Error) {
        return res.status(400).json({
            error: err.message
        });
    }
    return res.status(500).json({
        status: 'error',
        message: 'Internal server error.'
    });
});
// 1. Convertemos a porta para Número puro (Number)
const PORT = process.env.PORT ? Number(process.env.PORT) : 3333;
app.listen(PORT, () => {
    console.log(`Servidor Rodando na porta ${PORT}!!`);
});
// Senha do banco de dados postgreSQL: user: admin   | senha: admin
