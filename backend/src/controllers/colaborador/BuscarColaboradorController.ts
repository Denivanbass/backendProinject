
import { Request, Response } from "express"
import {BuscarColaboradorService} from "../../services/colaborador/BuscarColaboradorService.js"


class BuscarColaboradorController {

    async handle(req: Request, res: Response) {

        const buscarColaboradorService = new BuscarColaboradorService()

        const colaboradores = await buscarColaboradorService.execute()

        return res.json(colaboradores).status(200)
    }
}
export  { BuscarColaboradorController }