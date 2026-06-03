import { prisma } from "../../lib/prisma.js";




class BuscarColaboradorService {
    async execute () {

        const colaboradores = await prisma.colaborador.findMany({})

        return(colaboradores)
    }
}

export {BuscarColaboradorService}