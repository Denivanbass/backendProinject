import { prisma } from "../../lib/prisma.js";


interface cavidadeProps {

    descricao_versao: string;
    descricao_molde: string;
    quant_cav: number
}


class CreateCavidadeService {
    async execute({ descricao_versao, descricao_molde, quant_cav }: cavidadeProps) {

        const createCavidades = await prisma.$transaction(async (tx) => {

            const versao = await tx.versao.findFirst({
                where: { versao: descricao_versao },
                select: { id_versao: true }
            })

            const molde = await tx.molde.findFirst({
                where: { cod_molde: descricao_molde },
                select: { id_molde: true }
            })

            if (!versao || !molde) {
                throw new Error("Molde ou Versão não encontrado.")
            }


            const cavidadesParaCriar = Array.from({ length: quant_cav }, (_, index) => ({
                number: index + 1,
                status: "Aberta",
                id_molde: molde.id_molde,
                id_versao: versao.id_versao,
                updated_at: new Date()
            }))

            const cavidadesCriadas= await tx.cavidade.createMany({
                data: cavidadesParaCriar
            })
            
            return(cavidadesCriadas)

        })

        return(createCavidades)
    }
}

export { CreateCavidadeService };



// Enviar para criar as cavidades:
// nome da versao: FLIP OFF descricao_versao
// codigo do molde: MP-2020  descricao_molde
// Quantidade de cavidades: 48 (number) quant_cav
// status da cavidade status_cav