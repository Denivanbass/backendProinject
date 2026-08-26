import { DetailOcorrenciaService } from '../../services/ocorrencia/DetailOcorrenciaService.js';
class DetailOcorrenciaController {
    async handle(req, res) {
        const { id_ocorrencia } = req.body;
        const ocorrenciaService = new DetailOcorrenciaService();
        const ocorrencia = await ocorrenciaService.execute({ id_ocorrencia });
        return res.json(ocorrencia);
    }
}
export { DetailOcorrenciaController };
