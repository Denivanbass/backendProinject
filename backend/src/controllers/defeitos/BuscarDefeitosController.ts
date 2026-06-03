import { Request, Response } from "express"
import { BuscarDefeitosService } from "../../services/defeitos/BuscarDefeitosService.js"



class BuscarDefeitosController {
    async handle(req: Request, res: Response) {

        const buscarDefeitosService = new BuscarDefeitosService()

        const defeitos = await buscarDefeitosService.execute()


        return res.json(defeitos)
    }
}

export { BuscarDefeitosController }