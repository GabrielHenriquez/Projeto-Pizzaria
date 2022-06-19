import { Request, Response } from "express";
import { SendOrderService } from "../../services/order/SendOrderService";

class SendOrderController{
    async handle(req: Request, res: Response){
        const sendService = new SendOrderService()

        const {order_id} = req.body

        const send = await sendService.execute({order_id})

        return res.json(send)
    }
}

export {SendOrderController}