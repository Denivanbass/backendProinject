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
                where: { id_molde: molde?.id_molde, versao: codigo_versao },
                select: { id_versao: true }
            })


            if (!molde || !versao) {
                throw new Error('Molde ou cavidade não encontrado.')
            }

            const moldeRetornado = await tx.versao.findUnique({
                where: {
                    id_versao: versao.id_versao
                },
                include: {
                    molde: {
                        select: {
                            id_molde: true,
                            cod_molde: true,
                            description: true
                        }
                    },
                    cavidade: {
                        select: {
                            number: true,
                            status: true
                        }
                    }
                }

            });


            return (moldeRetornado)


        })

        return (moldeEncontrado)
    }
}
export { BuscarMoldeService }