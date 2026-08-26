import { Request, Response } from "express";
import { BuscarColaboradorService } from "../../services/colaborador/BuscarColaboradorService.js";

class BuscarColaboradorController {
  async handle(req: Request, res: Response) {
    console.log("[DIAGNOSTICO] 1. Recebeu requisição em /colaborador");
    
    try {
      const buscarColaboradorService = new BuscarColaboradorService();
      
      console.log("[DIAGNOSTICO] 2. Iniciando query do Prisma...");
      
      // Timeout de segurança manual de 10 segundos para impedir que o Insomnia fique pendente
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Timeout manual: O banco não respondeu em 10 segundos.")), 10000)
      );

      const colaboradores = await Promise.race([
        buscarColaboradorService.execute(),
        timeoutPromise
      ]);

      console.log("[DIAGNOSTICO] 3. Query executada com sucesso!");
      return res.status(200).json(colaboradores);

    } catch (error: any) {
      console.error("[DIAGNOSTICO] ERRO CAPTURADO:", error);
      return res.status(500).json({
        status: "error",
        message: error?.message || "Erro desconhecido",
        code: error?.code,
        meta: error?.meta,
        stack: error?.stack
      });
    }
  }
}

export { BuscarColaboradorController };