import { OcorrenciasService } from '../../services/ocorrencia/OcorrenciasService.js';
class OcorrenciasController {
    async handle(req, res) {
        const ocorrenciasService = new OcorrenciasService();
        const ocorrencia = await ocorrenciasService.execute();
        return res.json(ocorrencia);
    }
}
export { OcorrenciasController };
