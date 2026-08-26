import HashPassword from "../../lib/hashPassword.js";
import { prisma } from "../../lib/prisma.js";


interface cargoProps {
    nome: string;
    cargo: string;
    email: string;
    senha: string;
}

class CreateColaboradorService {
    async execute({ nome, cargo, email, senha }: cargoProps) {

        // Verificar se o email já existe.
        const emailexist = await prisma.colaborador.findUnique({
            where: {
                email: email
            }
        })

        if (emailexist) {
            throw new Error('Usuário já cadastrado.')
        }

        // Se não existir usuário cadastrado com esse email:
        const password_hash = await HashPassword(senha)

        const colaborador = await prisma.colaborador.create({
            data: {
                nome,
                cargo,
                email,
                password_hash
            }
        })
        return (colaborador)
    }
}

export { CreateColaboradorService };