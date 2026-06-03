
import { prisma } from "../../lib/prisma.js";

interface ocorrenciaIDprops {
    id_ocorrencia: number;
}

class DetailOcorrenciaService {
    async execute({ id_ocorrencia }: ocorrenciaIDprops) {


        const ocorrencia = await prisma.ocorrencia.findUnique({
            where: { id_ocorrencia },
            include: {
                cavidade: {
                    include: {
                        versao: true,
                        molde: true,
                    }
                },
                colaborador: true

            },

        });

        return (ocorrencia)
    }
}

export { DetailOcorrenciaService }


