import { prisma } from "../../lib/prisma.js";
class AbrirCavidadeservice {
    async execute({ cod_molde, versao, number }) {
        const cavidadeAberta = await prisma.$transaction(async (tx) => {
            // 1. Busca a cavidade navegando pelas relações: Cavidade -> Versão -> Molde
            const cavidadeEncontrada = await tx.cavidade.findFirst({
                where: {
                    number: number,
                    versao: {
                        versao: versao,
                        molde: {
                            cod_molde: cod_molde
                        }
                    }
                },
                select: { id_cavidade: true }
            });
            // 2. Validação antecipada
            if (!cavidadeEncontrada) {
                throw new Error("Cavidade, versão ou molde não encontrado.");
            }
            // 3. Busca a última ocorrência 'Fechada' dessa cavidade
            const ocorrenciaEncontrada = await tx.ocorrencia.findFirst({
                where: {
                    id_cavidade: cavidadeEncontrada.id_cavidade,
                    status_ocorrencia: 'Fechada'
                },
                select: { id_ocorrencia: true }
            });
            // 4. Atualiza a ocorrência apenas se ela existir
            if (ocorrenciaEncontrada) {
                await tx.ocorrencia.update({
                    where: { id_ocorrencia: ocorrenciaEncontrada.id_ocorrencia },
                    data: { status_ocorrencia: 'Aberta' }
                });
            }
            // 5. Atualiza o status da cavidade para 'Aberta'
            const updateStatusCavidade = await tx.cavidade.update({
                where: { id_cavidade: cavidadeEncontrada.id_cavidade },
                data: {
                    status: "Aberta",
                    updated_at: new Date()
                }
            });
            return updateStatusCavidade;
        });
        return cavidadeAberta;
    }
}
export { AbrirCavidadeservice };
