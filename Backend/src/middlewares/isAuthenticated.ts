import {NextFunction, Request, Response} from 'express'
import {verify} from 'jsonwebtoken'

interface PayLoad{
    sub: string
}

export function isAuthenticated(req: Request, res: Response, next: NextFunction){
    
    //Receber o token
    const authToken = req.headers.authorization   //o token sempre vem nessa requisição
    if(!authToken) return res.status(401).end() 

    const [, token] = authToken.split(" ")     //desconstruimos porque vem com o prefixo Bearer
    
    try{
        //Validar o token e pegando o ID do usuário 
        const { sub } = verify(token, process.env.JWT_SECRET) as PayLoad

        req.user_id = sub  //recuperar o Id do token e colocar dentro de uma váriavel user_id dentro do req.

        return next() //continua a apliacação
    }catch(error){
        console.log('Token Inválido')
        return res.status(401).end()
    }
}