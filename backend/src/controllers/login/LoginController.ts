import { Request, Response } from "express";
import { LoginService } from "../../services/login/LoginService.js";



class LoginController {
    async handle(req: Request, res: Response) {
        const { email, senha } = req.body

        const loginService = new LoginService();

        const response = await loginService.execute({ email, senha })

        return res.json(response)
    }
}

export { LoginController };