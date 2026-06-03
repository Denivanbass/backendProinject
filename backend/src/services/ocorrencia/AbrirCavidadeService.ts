import { prisma } from "../../lib/prisma.js";



interface AbrirCavidadesProps {
    cod_molde: string;
    versao: string;
    number: number;
}


class AbrirCavidadeservice {
    async execute({ cod_molde, versao, number }: AbrirCavidadesProps) {

        const cavidadeAberta = await prisma.$transaction(async (tx) => {

            const cavidadeEncontrada = await tx.cavidade.findFirst({
                where: {
                    molde: { cod_molde: cod_molde },
                    versao: { versao: versao },
                    number: number

                }
            })

            const id_ocorrencia = await tx.ocorrencia.findFirst({
                where: {
                    status_ocorrencia: 'Fechada',
                    id_cavidade: cavidadeEncontrada?.id_cavidade
                },
                select: {
                    id_ocorrencia: true
                }
            })
           

            if (!cavidadeEncontrada) {
                throw new Error("Molde não encontrado.")              
            }


            const updateStatusOcorrencia = await tx.ocorrencia.update({
                where:{ id_ocorrencia: id_ocorrencia?.id_ocorrencia },

                data: {
                    status_ocorrencia: 'Aberta'
                },              
                
            })

            const updateStatusCavidade = await tx.cavidade.update({
                where: { id_cavidade: cavidadeEncontrada.id_cavidade },
                data: {
                    status: "Aberta"
                }
            })



            return(updateStatusCavidade)
        })

        return (cavidadeAberta)
    }
}
export { AbrirCavidadeservice }




// cod_molde
// versao
// number