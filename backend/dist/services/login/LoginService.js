import CompareHash from "../../lib/compareHash.js";
import { prisma } from "../../lib/prisma.js";
import Jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();
class LoginService {
    async execute({ email, senha }) {
        // Verificar se o email existe
        // Se existir pegue o passwordHash
        const colaborador = await prisma.colaborador.findUnique({
            where: { email: email },
            select: { password_hash: true, cargo: true, id_colaborador: true }
        });
        if (!colaborador || !colaborador.password_hash) {
            throw new Error('Usuário ou senha inválidos.');
        }
        const password_hash = colaborador.password_hash;
        const isValid = await CompareHash(senha, password_hash);
        if (!isValid) {
            throw new Error('Usuário ou senha inválida.');
        }
        const payload = {
            id: colaborador.id_colaborador,
            email: email,
            cargo: colaborador.cargo
        };
        //  Criar e retornar um token para o client:
        const token = Jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
        return ({
            id: colaborador.id_colaborador,
            email: email,
            cargo: colaborador.cargo,
            token
        });
    }
}
export { LoginService };
