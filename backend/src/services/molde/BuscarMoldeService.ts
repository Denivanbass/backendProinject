import { prisma } from "../../lib/prisma.js";

interface buscarProps {
    codigo_molde: string;
    codigo_versao: string;
}

class BuscarMoldeService {
    async execute({ codigo_molde, codigo_versao }: buscarProps) {

        const moldeEncontrado = await prisma.$transaction(async (tx) => {

            const molde = await tx.molde.findFirst({
                where: { cod_molde: codigo_molde },
                select: { id_molde: true }
            })

            const versao = await tx.versao.findFirst({
                where: { versao: codigo_versao },
                select: { id_versao: true }
            })


            if (!molde || !versao) {
                throw new Error('Molde ou cavidade não encontrado.')
            }

            const moldeRetornado = await tx.cavidade.findMany({
                where: {
                    id_molde: molde.id_molde,
                    id_versao: versao.id_versao,
                },
                select: {
                    number: true,
                    status: true,
                    versao: {
                        select: {
                            versao: true
                        }
                    },
                    molde: {
                        select: { cod_molde: true }
                    }
                }


            })
            
            return (moldeRetornado)

        })

        return (moldeEncontrado)
    }
}
export { BuscarMoldeService }