import { Request, Response } from "express";
import {CreateVersionService }from "../../services/versao/CreateVersionService.js";



class CreateVersionController {
    async handle (req: Request, res: Response) {
        const { versao } = req.body;

        const createVersionService = new CreateVersionService();

        const createVersion = await createVersionService.execute({
            versao
        })

        return res.json(createVersion)
    }

}

export { CreateVersionController };