import prismaClient from "../../prisma";

class DetailsUserService{
    async execute(id: string){
        const user = await prismaClient.user.findFirst({  //buscando o usuário no banco de dados pelo ID
            where:{id},
            select:{
                id: true,
                name: true,
                email: true
            }
        })  

        return user
    }
}

export {DetailsUserService}