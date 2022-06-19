import { prisma } from "@prisma/client";
import prismaClient from "../../prisma";

interface CategoryRequest{
    name: string
}

class CreateCategoryService{
    async execute({ name }: CategoryRequest){

        if(name === '') throw new Error('Name invalid')

        const nameAlreadyExists = await prismaClient.category.findFirst({where:{name}})
        if(nameAlreadyExists) throw new Error('Name already exists.')

        const category = await prismaClient.category.create({
            data:{name},
            select:{
                id: true,
                name: true
            }
        })

        return category
    }
}

export {CreateCategoryService}