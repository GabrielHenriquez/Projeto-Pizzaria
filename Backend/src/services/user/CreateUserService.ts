//Funcionalidade de registrar o usuário no banco de dados

import prismaClient from '../../prisma'
import {hash} from 'bcryptjs'

interface UserRequest{
    name: string,
    email: string,
    password: string
}

class CreateUserService{
    async execute({name, email, password}: UserRequest){

     //1-- Verifica se enviou um email
     if(!email) throw new Error('Email Incorrect')

     //2-- Verifica se esse email já está cadastrado na plataforma
     const userAlreadyExists = await prismaClient.user.findFirst({where:{email}})
     if(userAlreadyExists)throw new Error('User Already exists')

     //Cadastra no banco de dados
     const passwordHash = await hash(password, 8)  //Criptografando a senha
     const user = await prismaClient.user.create({
        data:{name, email, password: passwordHash},
        select:{
            id: true,
            name: true,
            email: true
        }
     })

     return user
    }
}

export {CreateUserService}