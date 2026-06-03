import { prisma } from "../../lib/prisma.js";

interface buscarCavProps {
    codigo_molde: string;
    codigo_versao: string;
}

class BuscarCavFechadaService {
    async execute({ codigo_molde, codigo_versao }: buscarCavProps) {

        const cavFechada = await prisma.$transaction(async (tx) => {

            const molde = await tx.molde.findFirst({
                where: { cod_molde: codigo_molde },
                select: { id_molde: true }
            })


            const versao = await tx.versao.findFirst({
                where: { versao: codigo_versao },
                select: { id_versao: true }
            })


            const cavidadeID = await tx.cavidade.findMany({
                where: {
                    id_molde: molde?.id_molde,
                    id_versao: versao?.id_versao,
                    status: "Fechada"
                },
                select: { id_cavidade: true, number: true, status: true }
            })

            // const statusOcorrencia = await tx.ocorrencia.findMany({
            //     where: {
            //         status_ocorrencia: 'Fechada'
            //     }
            // })



            if (!molde || !versao) {
                throw new Error('Molde ou cavidade não encontrado.')
            }

            const idDasCavidades = cavidadeID.map(cav => cav.id_cavidade)


            const moldeRetornado = await tx.ocorrencia.findMany({
                where: {
                    id_cavidade: {
                        in: idDasCavidades,
                    },
                    status_ocorrencia: 'Fechada'
                },
                include: {
                    cavidade: {
                        select: {
                            number: true
                        }
                    },
                    defeito: true,
                }
            })

            return (moldeRetornado)

        })

        return (cavFechada)
    }
}
export { BuscarCavFechadaService }