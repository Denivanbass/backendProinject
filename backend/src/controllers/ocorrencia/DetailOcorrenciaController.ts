import { Request, Response } from 'express'
import { DetailOcorrenciaService } from '../../services/ocorrencia/DetailOcorrenciaService.js';





class DetailOcorrenciaController {
    async handle(req: Request, res: Response) {     

        const { id_ocorrencia } = req.body;

        const ocorrenciaService = new DetailOcorrenciaService();


        const ocorrencia = await ocorrenciaService.execute({id_ocorrencia})

        return res.json(ocorrencia)

    }
}


export { DetailOcorrenciaController };


