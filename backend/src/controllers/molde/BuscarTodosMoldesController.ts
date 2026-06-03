import { Request, Response } from "express"
import { BuscarTodosMoldesService } from "../../services/molde/BuscarTodosMoldesService.js"



class BuscarTodosMoldesController {
    async handle(req: Request, res: Response) {

        const buscarTodosMoldesService = new BuscarTodosMoldesService()

        const moldesEncontrados = await buscarTodosMoldesService.execute()

        return res.json(moldesEncontrados)
    }
}
export { BuscarTodosMoldesController }