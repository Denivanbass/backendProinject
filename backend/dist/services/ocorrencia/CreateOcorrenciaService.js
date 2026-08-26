import { prisma } from "../../lib/prisma.js";
class CreateOcorrenciaService {
    async execute({ num_cav, id_defeito, codigo_molde, versao, id_colaborador }) {
        const createOcorrencia = await prisma.$transaction(async (tx) => {
            const molde = await tx.molde.findFirst({
                where: { cod_molde: codigo_molde }, select: { id_molde: true }
            });
            const versaoEcontrada = await tx.versao.findFirst({
                where: { versao: versao, id_molde: molde?.id_molde }, select: { id_versao: true }
            });
            const cavidadeEncontrada = await tx.cavidade.findFirst({
                where: { id_versao: versaoEcontrada?.id_versao, number: num_cav }, select: { id_cavidade: true }
            });
            if (!molde || !versaoEcontrada || !cavidadeEncontrada) {
                throw new Error("Cavidade não encontrada para este molde.");
            }
            const id_cavidade = cavidadeEncontrada.id_cavidade;
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
            });
            return (ocorrencia);
        });
        return (createOcorrencia);
    }
}
export { CreateOcorrenciaService };
