import { Request, Response } from "express";
import { RemoveItemService } from "../../services/order/RemoveItemService";

class RemoveItemController{
    async handle(req: Request, res: Response){
        const removeItemService = new RemoveItemService()

        const item_id = req.query.item_id as string

        const deleteItem = await removeItemService.execute({item_id})

        return res.json(deleteItem)
    }
}

export {RemoveItemController}