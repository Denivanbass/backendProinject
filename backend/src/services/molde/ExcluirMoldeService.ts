import { prisma } from "../../lib/prisma.js";

interface MoldeProps {
    codigo_molde: string;
    codigo_versao: string;
}


class ExcluirMoldeService {
    async execute({ codigo_molde, codigo_versao }: MoldeProps) {
        const moldeExcluido = await prisma.$transaction(async (tx) => {
            
            

            const molde = await tx.molde.findFirst({
                where:{ cod_molde: codigo_molde}, 
                select:{ id_molde: true }
            })

            const versao = await tx.versao.findFirst({
                where: { versao: codigo_versao }, 
                select:{ id_versao: true }
            })


            if (!molde || !versao) {
                throw new Error('Molde não encontrado.')
            }


            const deletarCavidades = await tx.cavidade.deleteMany({
                where: {
                    id_molde: molde?.id_molde,
                    id_versao: versao?.id_versao
                }
            })
            
            const deletarVersao = await tx.versao.delete({
                where: { id_versao: versao.id_versao }
            })

            const deletarMolde = await tx.molde.delete({
                where:{ id_molde: molde.id_molde }                
            })


            return ( deletarMolde )

           
        })
        return ( moldeExcluido )
    }
}

export { ExcluirMoldeService }