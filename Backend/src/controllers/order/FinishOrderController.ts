import { Request, Response } from "express";
import { FinishOrderService } from "../../services/order/FinishOrderService";

class FinshOrderController{
    async handle(req: Request, res: Response){
        const finishService = new FinishOrderService()

        const {order_id} = req.body

        const finishOrder = await finishService.execute({order_id})

        return res.json(finishOrder)
    }
}

export {FinshOrderController}