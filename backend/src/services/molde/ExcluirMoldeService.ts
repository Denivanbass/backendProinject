import { prisma } from "../../lib/prisma.js";

interface MoldeProps {
    codigo_molde: string;
    codigo_versao: string;
}

class ExcluirMoldeService {
    async execute({ codigo_molde, codigo_versao }: MoldeProps) {
        const moldeExcluido = await prisma.$transaction(async (tx) => {

            // 1. Busca Molde
            const molde = await tx.molde.findFirst({
                where: { cod_molde: codigo_molde }, 
                select: { id_molde: true }
            });

            // 2. Busca Versão
            const versao = await tx.versao.findFirst({
                where: { id_molde: molde?.id_molde, versao: codigo_versao },
                select: { id_versao: true }
            });

            // 3. Validação ANTES de tentar excluir qualquer coisa
            if (!molde || !versao) {
                throw new Error('Molde ou versão não encontrado.');
            }

            // 4. Busca os IDs das cavidades dessa versão
            const cavidades = await tx.cavidade.findMany({
                where: { id_versao: versao.id_versao },
                select: { id_cavidade: true }
            });

            // Extrai apenas o array numérico: [10, 11, 12]
            const cavidadesIDs = cavidades.map(c => c.id_cavidade);

            // 5. Deleta Ocorrências (se houver cavidades cadastradas)
            if (cavidadesIDs.length > 0) {
                await tx.ocorrencia.deleteMany({
                    where: { 
                        id_cavidade: { 
                            in: cavidadesIDs 
                        } 
                    }
                });
            }

            // 6. Deleta Cavidades
            await tx.cavidade.deleteMany({
                where: { id_versao: versao.id_versao }
            });

            // 7. Deleta Versão
            const deletarVersao = await tx.versao.delete({
                where: { id_versao: versao.id_versao }
            });

            return deletarVersao;
        });

        return moldeExcluido;
    }
}

export { ExcluirMoldeService };