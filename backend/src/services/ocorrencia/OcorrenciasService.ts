
import { prisma } from "../../lib/prisma.js";



class OcorrenciasService {
    async execute() {


        const ocorrencia = await prisma.ocorrencia.findMany({
            include:{
                cavidade:{
                    include: {
                        molde: true,
                        versao: true,
                    }
                }, 
                colaborador:true,

            }
        });

        return (ocorrencia)
    }
}

export { OcorrenciasService }


