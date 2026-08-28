// Arquivo Servidor


import express, { Request, Response, NextFunction } from 'express';
import { router } from './routes.js';
import cors from 'cors';
import path from 'path';


console.log("NODE VERSION:", process.version);
console.log("NODE EXEC PATH:", process.execPath);


console.log("DATABASE_HOST:", process.env.DATABASE_HOST);
console.log("DATABASE_PORT:", process.env.DATABASE_PORT);
console.log("DATABASE_USER:", process.env.DATABASE_USER);
console.log("DATABASE_NAME:", process.env.DATABASE_NAME);
console.log("DATABASE_URL HOST:", process.env.DATABASE_URL?.split("@")[1]);


const app = express();
app.use(express.json());
app.use(cors())

app.use(router);

app.use(
    '/files',
    express.static(path.resolve(__dirname, '..', 'tmp'))
)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof Error) {
        return res.status(400).json({
            error: err.message
        })
    }
    return res.status(500).json({
        status: 'error',
        message:'Internal server error.'
    })
})

// 1. Convertemos a porta para Número puro (Number)
const PORT = process.env.PORT ? Number(process.env.PORT) : 3333;


app.listen(PORT, () => {
    console.log(`Servidor Rodando na porta ${PORT}!!`);
});


// Senha do banco de dados postgreSQL: user: admin   | senha: admin