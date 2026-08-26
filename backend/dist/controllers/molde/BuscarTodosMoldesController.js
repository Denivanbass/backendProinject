import { BuscarTodosMoldesService } from "../../services/molde/BuscarTodosMoldesService.js";
class BuscarTodosMoldesController {
    async handle(req, res) {
        const buscarTodosMoldesService = new BuscarTodosMoldesService();
        const moldesEncontrados = await buscarTodosMoldesService.execute();
        return res.json(moldesEncontrados);
    }
}
export { BuscarTodosMoldesController };
