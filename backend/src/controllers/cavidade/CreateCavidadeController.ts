import { Request, Response } from "express";
import { CreateCavidadeService } from "../../services/cavidade/CreateCavidadeService.js";


class CreateCavidadeController {
    async handle( req: Request, res: Response ) {

        const { descricao_versao, descricao_molde, quant_cav } = req.body;
        
        const createCavidadeService = new CreateCavidadeService();

        const createCavidade = await createCavidadeService.execute({
           descricao_molde,
           descricao_versao,
           quant_cav
        });

        return res.json(createCavidade)
    }
}
export { CreateCavidadeController };