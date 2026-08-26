import { Request, Response, NextFunction } from "express";
import Jwt from "jsonwebtoken";
import dotenv from 'dotenv'

dotenv.config();

async function Auth(req: Request, res: Response, next: NextFunction) {

    const token = req.headers.authorization

    if (!token) {
        return res.status(401).json('Token não fornecido.')
    }

    // Formatar token para retirar a palavra bearer
    const [, tokenFormatado] = token.split(' ')
    // Verificar se o token é válido:

    try {
        const isValid = Jwt.verify(tokenFormatado, process.env.JWT_SECRET!)
        return next()

    } catch (error) {
        return res.status(401).json('Token inválido.')

    }

}

export default Auth;