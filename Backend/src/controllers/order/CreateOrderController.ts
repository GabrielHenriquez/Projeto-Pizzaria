import { Request, Response } from "express";
import { CreateOrderService } from "../../services/order/CreateOrderService";
import prismaClient from "../../prisma";

class CreateOrderController{
    async handle(req: Request, res: Response){
        const createOrderService = new CreateOrderService

        const {table, name} = req.body
        
        const order = await createOrderService.execute({table, name})

        return res.json(order)
    }
}

export {CreateOrderController}