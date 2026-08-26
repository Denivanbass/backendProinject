import { prisma } from "../../lib/prisma.js";

interface buscarCavProps {
    codigo_molde: string;
    codigo_versao: string;
}

class BuscarCavFechadaService {
    async execute({ codigo_molde, codigo_versao }: buscarCavProps) {
        
        // O Prisma navega pelas relações e filtra tudo em um único SQL (JOIN)
        const ocorrenciasFechadas = await prisma.ocorrencia.findMany({
            where: {
                status_ocorrencia: 'Fechada',
                cavidade: {
                    status: 'Fechada',
                    versao: {
                        versao: codigo_versao,
                        molde: {
                            cod_molde: codigo_molde
                        }
                    }
                }
            },
            include: {
                cavidade: {
                    select: {
                        number: true
                    }
                },
                defeito: true
            }
        });

        return ocorrenciasFechadas;
    }
}

export { BuscarCavFechadaService };