import { CreateOcorrenciaService } from "../../services/ocorrencia/CreateOcorrenciaService.js";
class CreateOcorrenciaController {
    async handle(req, res) {
        const { num_cav, id_defeito, codigo_molde, versao, id_colaborador } = req.body;
        const createOcorrenciaService = new CreateOcorrenciaService();
        const createOcorrencia = await createOcorrenciaService.execute({
            num_cav,
            id_defeito,
            codigo_molde,
            versao,
            id_colaborador,
        });
        return res.json(createOcorrencia);
    }
}
export { CreateOcorrenciaController };
