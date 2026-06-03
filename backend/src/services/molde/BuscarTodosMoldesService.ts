import { prisma } from "../../lib/prisma.js";





class BuscarTodosMoldesService {
    async execute() {

        const moldesEncontrados = await prisma.cavidade.findMany({
            include: {
                molde: true,
                versao: true
            }
        })


        return (moldesEncontrados)
    }
}
export { BuscarTodosMoldesService }