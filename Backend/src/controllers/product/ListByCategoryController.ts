import { Request, Response } from "express";
import { ListByCategoryService } from "../../services/product/ListByCategoryService";

class ListByCategoryController{
    async handle(req: Request, res: Response){
        const listByCategoryService = new ListByCategoryService()

        const category_id = req.query.category_id as string;

        const products = await listByCategoryService.execute({category_id})

        return res.json(products)
    }
}

export {ListByCategoryController}