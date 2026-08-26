import { prisma } from "../../lib/prisma.js";
class OcorrenciasService {
    async execute() {
        const ocorrencia = await prisma.ocorrencia.findMany({
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
                colaborador: true,
                defeito: true // <--- ADICIONE ESTA LINHA para trazer os dados do colaborador
            }
        });
        return (ocorrencia);
    }
}
export { OcorrenciasService };
