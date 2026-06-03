import { prisma } from "../../lib/prisma.js";


interface versionProps {
    versao: string;
}


class CreateVersionService {

    async execute({ versao }:versionProps) {

        const createVersion = await prisma.versao.create({
            data:{
                versao
            }
        })


        return (createVersion)
    }
}

export { CreateVersionService };