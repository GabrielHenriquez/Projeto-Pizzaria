import { findSync } from "@prisma/client/runtime";
import prismaClient from "../../prisma";

interface OrderRequest{
    order_id: string
}

class FinishOrderService{
    async execute({order_id}: OrderRequest){
        const finishOrder = await prismaClient.order.update({
            where:{id: order_id},
            data:{
                status: true
            }
        })

        return finishOrder
    }
}

export {FinishOrderService}