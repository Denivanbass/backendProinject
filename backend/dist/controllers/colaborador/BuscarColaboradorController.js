import { BuscarColaboradorService } from "../../services/colaborador/BuscarColaboradorService.js";
class BuscarColaboradorController {
    async handle(req, res) {
        const buscarColaboradorService = new BuscarColaboradorService();
        const colaboradores = await buscarColaboradorService.execute();
        return res.status(200).json(colaboradores);
    }
}
export { BuscarColaboradorController };
