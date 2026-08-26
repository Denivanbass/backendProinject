import { BuscarDefeitosService } from "../../services/defeitos/BuscarDefeitosService.js";
class BuscarDefeitosController {
    async handle(req, res) {
        const buscarDefeitosService = new BuscarDefeitosService();
        const defeitos = await buscarDefeitosService.execute();
        return res.json(defeitos);
    }
}
export { BuscarDefeitosController };
