import { Request, Response } from "express"
import { BuscarCavFechadaService } from "../../services/molde/BuscarCavFechadaService.js";



class BuscarCavFechadaController {
    async handle(req: Request, res: Response) {
        const { codigo_molde, codigo_versao } = req.params;

        const buscarCavFechadaService = new BuscarCavFechadaService();

        const cavEncontradas = await buscarCavFechadaService.execute({
            codigo_molde: String(codigo_molde),
            codigo_versao: String(codigo_versao)
        })

        return res.json(cavEncontradas)

    }
}
export { BuscarCavFechadaController }