import { Request, Response } from 'express'
import { OcorrenciasService } from '../../services/ocorrencia/OcorrenciasService.js';




class OcorrenciasController {
    async handle(req: Request, res: Response) {  

        
        const ocorrenciasService = new OcorrenciasService();


        const ocorrencia = await ocorrenciasService.execute()

        return res.json(ocorrencia)

    }
}


export { OcorrenciasController };


