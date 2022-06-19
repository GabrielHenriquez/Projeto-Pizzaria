import crypto from 'crypto'  //Já vem com o JS, criar Hash Criptografado
import multer from "multer";

import {extname, resolve} from 'path'  //Já vem com o JS , Usar/Pegar caminhos

export default{
    upload(folder: string){
        return{
            storage: multer.diskStorage({
                destination: resolve(__dirname, '..', '..', folder),
                filename: (request, file, callback) => {
                    const fileHash = crypto.randomBytes(16).toString("hex")
                    const fileName = `${fileHash}-${file.originalname}`

                    return callback(null, fileName)
                }
            })
        }
    }
}