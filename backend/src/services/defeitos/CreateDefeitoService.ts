import { prisma } from "../../lib/prisma.js";


interface DefeitoProps {    
    descricao_defeito: string;
}


class CreateDefeitoService {
    async execute({  descricao_defeito }: DefeitoProps) {

        const createDefeito = await prisma.defeito.create({
            data: {
                
                descricao_defeito
            }
        })

        return (createDefeito)
    }
}
export { CreateDefeitoService }