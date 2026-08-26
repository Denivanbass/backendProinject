import { prisma } from "../../lib/prisma.js";

interface MoldeProps {
    cod_molde: string;
    description: string;
    versao: string;
    number: number;
}

class CreateMoldeVersaoService {
    async execute({ cod_molde, description, versao, number }: MoldeProps) {

        const moldeCriado = await prisma.$transaction(async (tx) => {

            const moldeExiste = await tx.molde.findFirst({
                where: { cod_molde: cod_molde }, select: { id_molde: true }
            })
            const idmoldeFinal = moldeExiste ? moldeExiste.id_molde : (await tx.molde.create({
                data: { cod_molde: cod_molde, description: description }, select: { id_molde: true }
            })).id_molde

            const versaoExiste = await tx.versao.findFirst({
                where: { id_molde: idmoldeFinal, versao: versao }, select: { id_molde: true, id_versao: true }
            })


            const idVersaoFinal = versaoExiste ? versaoExiste.id_versao : (await tx.versao.create({
                data: {
                    versao: versao,
                    id_molde: idmoldeFinal
                },
                select: { id_versao: true, id_molde: true }
            })).id_versao



            const cavidadesExiste = await tx.cavidade.count({
                where: {
                    
                    id_versao: idVersaoFinal
                }
            })

            if (cavidadesExiste > 0) {
                throw new Error('Molde e versão já existe')
            }


            /// Criar o objeto molde e Versao para inserir no banco:
            const criarMoldeVersao = Array.from({ length: number }, (_, index) => ({
                number: index + 1,
                status: "Aberta",                
                id_versao: idVersaoFinal,
                updated_at: new Date()
            }))


            // Criar a lista de cavidades no banco
            const moldeVersaoCriado = await tx.cavidade.createMany({
                data: criarMoldeVersao
                
            })

            return moldeVersaoCriado;
        })

        return moldeCriado;
    }
}

export { CreateMoldeVersaoService };
