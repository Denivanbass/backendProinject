import { Request, Response } from "express";
import { CreateColaboradorService } from "../../services/colaborador/CreateColaboradorService.js";



class CreateColaboradorController {
    async handle(req: Request, res: Response) {

        const { nome, cargo, email, senha } = req.body;

        const createColaboradorService = new CreateColaboradorService();
        
        const createColaborador = await createColaboradorService.execute({
            nome,
            cargo,
            email,
            senha
        })

        return res.json(createColaborador)
    }
}

export { CreateColaboradorController };