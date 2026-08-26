import { CreateColaboradorService } from "../../services/colaborador/CreateColaboradorService.js";
class CreateColaboradorController {
    async handle(req, res) {
        const { nome, cargo, email, senha } = req.body;
        const createColaboradorService = new CreateColaboradorService();
        const createColaborador = await createColaboradorService.execute({
            nome,
            cargo,
            email,
            senha
        });
        return res.json(createColaborador);
    }
}
export { CreateColaboradorController };
