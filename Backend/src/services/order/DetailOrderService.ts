import prismaClient from "../../prisma";

interface OrderRequest{
    order_id: string
}

class DetailOrderService{
    async execute({order_id}: OrderRequest){

        const details = await prismaClient.item.findMany({
            where:{order_id},
            include:{
                product: true,
                order: true
            }
        })

        return details
    }
}

export {DetailOrderService}