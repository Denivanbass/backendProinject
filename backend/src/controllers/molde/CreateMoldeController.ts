import { Request, Response } from "express";
import { CreateMoldeService } from "../../services/molde/CreateMoldeService.js";




class CreateMoldeController {
    async handle(req: Request, res: Response) {
        const { description, cod_molde } = req.body

        const createMoldeService = new CreateMoldeService();

        const createMolde = await createMoldeService.execute({
            description,
            cod_molde,
        });

        return res.json(createMolde);
    }
}

export { CreateMoldeController };