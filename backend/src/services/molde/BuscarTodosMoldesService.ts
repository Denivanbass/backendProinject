import { prisma } from "../../lib/prisma.js";





class BuscarTodosMoldesService {
    async execute() {

        const moldesEncontrados = await prisma.molde.findMany({
            include:{versao:true},
        })


        return (moldesEncontrados)
    }
}
export { BuscarTodosMoldesService }