import { prisma } from "../../lib/prisma.js";
class DetailOcorrenciaService {
    async execute({ id_ocorrencia }) {
        const ocorrencia = await prisma.ocorrencia.findUnique({
            where: { id_ocorrencia },
            include: {
                cavidade: {
                    include: {
                        versao: {
                            include: {
                                molde: true
                            }
                        }
                    }
                },
                colaborador: true
            }
        });
        return (ocorrencia);
    }
}
export { DetailOcorrenciaService };
