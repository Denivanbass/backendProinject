import { CreateDefeitoService } from "../../services/defeitos/CreateDefeitoService.js";
class CreateDefeitoController {
    async handle(req, res) {
        const { descricao_defeito } = req.body;
        const createDefeitoService = new CreateDefeitoService();
        const createDefeito = await createDefeitoService.execute({
            descricao_defeito,
        });
        return res.json(createDefeito);
    }
}
export { CreateDefeitoController };
