import { Request, Response } from "express"
import { ExcluirMoldeService } from "../../services/molde/ExcluirMoldeService.js"



class ExcluirMoldeController {
    async handle (req: Request, res: Response) {

        const { codigo_molde, codigo_versao } = req.body

        const excluirMoldeService = new ExcluirMoldeService()

        const moldeExcluido = await excluirMoldeService.execute({
            codigo_molde,
            codigo_versao
        })

        
        return res.json(moldeExcluido)
    }
}
export { ExcluirMoldeController }