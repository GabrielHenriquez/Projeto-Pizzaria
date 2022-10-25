import express, {Request, Response, NextFunction} from "express";
import 'express-async-errors' //biblioteca para tratamento de erros
const cors = require('cors') //biblioteca para liberar para qualquer ip/url fazer essa requisição
const path = require('path') //recurso para caminhos

import { router } from "./routes";

const app = express() //Instância do express
const port = 3000

app.use(express.json()) //Gerar em json nosso express
app.use(cors())  //Liberando para qualquer ip/url fazer requisição dessa API
app.use(router) //Permisão para uso das rota

app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')))  //Middleware para termos acesso da imagem no site

//Middleware para tratamento de erro, caso não entre na rota correta.
app.use((error: Error, req: Request, res: Response) => {
    if(error instanceof Error){
        return res.status(400).json({
            error: error.message
        })
    }

    return res.status(500).json({
        status: 'error',
        message: 'Internal server error.'
    })
})

app.listen(port, () => console.log('Servidor Online!')) 