import { CreateMoldeVersaoService } from "../../services/molde/CreateMoldeVersaoService.js";
class CreateMoldeVersaoController {
    async handle(req, res) {
        const { cod_molde, description, versao, number } = req.body;
        const createMoldeVersaoService = new CreateMoldeVersaoService();
        const moldeVersaoCriado = await createMoldeVersaoService.execute({
            cod_molde,
            description,
            versao,
            number
        });
        return res.json(moldeVersaoCriado);
    }
}
export { CreateMoldeVersaoController };
