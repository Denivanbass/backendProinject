import { prisma } from "../../lib/prisma.js";

interface cargoProps {
    nome: string;
    cargo: string;
}

class CreateColaboradorService {
    async execute({ nome, cargo }: cargoProps) {

        const colaborador = await prisma.colaborador.create({
            data: {
                nome,
                cargo,
            }           
        })
        return (colaborador)
    }
}

export { CreateColaboradorService };