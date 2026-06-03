import { prisma } from "../../lib/prisma.js";

interface moldeProps {
    description: string;
    cod_molde: string;
}


class CreateMoldeService {
    async execute({ description, cod_molde }: moldeProps) {

        const createMolde = await prisma.molde.create({
            data: {                
                cod_molde,
                description
            }
        })

        return (createMolde);
    }
}

export { CreateMoldeService };