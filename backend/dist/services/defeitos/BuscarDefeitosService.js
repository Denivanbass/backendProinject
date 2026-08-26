import { prisma } from "../../lib/prisma.js";
class BuscarDefeitosService {
    async execute() {
        const defeitos = await prisma.defeito.findMany();
        return (defeitos);
    }
}
export { BuscarDefeitosService };
