import { prisma } from "../../lib/prisma.js";
class CreateDefeitoService {
    async execute({ descricao_defeito }) {
        const createDefeito = await prisma.defeito.create({
            data: {
                descricao_defeito
            }
        });
        return (createDefeito);
    }
}
export { CreateDefeitoService };
