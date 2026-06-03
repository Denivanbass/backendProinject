import { prisma } from "../../lib/prisma.js";

interface ocorrenciaProps {
    num_cav: number;
    id_defeito: number;
    codigo_molde: string;
    versao: string;
    id_colaborador: number;
}




class CreateOcorrenciaService {
    async execute({ num_cav, id_defeito, codigo_molde, versao, id_colaborador }: ocorrenciaProps) {



        const createOcorrencia = await prisma.$transaction(async (tx) => {
            const cavidadeEncontrada = await tx.cavidade.findFirst({
                where: {
                    number: num_cav,
                    molde: { cod_molde: codigo_molde },
                    versao: { versao: versao },
                },
                select: { id_cavidade: true }
            })

            if (!cavidadeEncontrada) {
                throw new Error("Cavidade não encontrada para este molde.")
            }

            const id_cavidade = cavidadeEncontrada.id_cavidade

            const ocorrencia = await tx.ocorrencia.create({
                data: {
                    id_cavidade: id_cavidade,
                    id_defeito: id_defeito,
                    status_ocorrencia: 'Fechada',
                    id_colaborador,
                    created_at: new Date()
                }
            });

            await tx.cavidade.update({
                where: { id_cavidade: id_cavidade },
                data: {
                    status: "Fechada"
                }
            })


            return (ocorrencia)
        })
        return (createOcorrencia)
    }
}

export { CreateOcorrenciaService };



