import { Request, Response } from "express"
import { AbrirCavidadeservice } from "../../services/ocorrencia/AbrirCavidadeService.js"



class AbrirCavidadeController {
    async handle(req: Request, res: Response) {
        const { cod_molde, versao, number } = req.body

        const abrirCavidadeservice = new AbrirCavidadeservice()

        const cavidadeAberta = await abrirCavidadeservice.execute({
            cod_molde,
            versao,
            number
        })

        return res.json(cavidadeAberta)
    }
}
export { AbrirCavidadeController }