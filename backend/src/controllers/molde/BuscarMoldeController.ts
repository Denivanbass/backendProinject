import { Request, Response } from "express"
import { BuscarMoldeService } from "../../services/molde/BuscarMoldeService.js";



class BuscarMoldeController {
    async handle (req: Request, res: Response) {
        const { codigo_molde, codigo_versao } = req.params;

        const buscarMoldeService = new BuscarMoldeService();

        const cavEncontradas = await buscarMoldeService.execute({
            codigo_molde: String(codigo_molde),
            codigo_versao: String(codigo_versao)
        })

        return res.json(cavEncontradas)

    }
}
export { BuscarMoldeController }