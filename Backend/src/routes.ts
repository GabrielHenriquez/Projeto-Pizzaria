import {Router} from 'express'
import multer from 'multer'
import uploadConfig from './config/multer'

import { CreateUserController } from './controllers/user/CreateUserController'
import { AuthUserController } from './controllers/user/AuthUserController'
import { DetailUserController } from './controllers/user/DetailsUserController'
import { CreateCategoryController } from './controllers/category/CreateCategoryController'
import { ListCategoryController } from './controllers/category/ListCategoryController'
import { CreateProductController } from './controllers/product/CreateProductController'
import { ListByCategoryController } from './controllers/product/ListByCategoryController'
import { CreateOrderController } from './controllers/order/CreateOrderController'
import { RemoveOrderController } from './controllers/order/RemoveOrderController'
import { AddItemController } from './controllers/order/AddItemController'
import { RemoveItemController } from './controllers/order/RemoveItemController'
import { SendOrderController } from './controllers/order/SendOrderController'
import { ListOrderController } from './controllers/order/ListOrderController'
import { DetailOrderController } from './controllers/order/DetailOrderController'
import { FinshOrderController } from './controllers/order/FinishOrderController'

//middleware para pegar e validar o token para prosseguirmos em rotas privadas.
import { isAuthenticated } from './middlewares/isAuthenticated'     
                                                                                                      
const router = Router()
const upload = multer(uploadConfig.upload("./tmp"))   //podemos usar como um middleware

//-- ROTAS USER --
router.post('/users', new CreateUserController().handle)
router.post('/session', new AuthUserController().handle)
router.get('/info', isAuthenticated, new DetailUserController().handle)

//-- ROTAS CATEGORY -- 
router.post('/category', isAuthenticated, new CreateCategoryController().handle)
router.get('/categories', isAuthenticated, new ListCategoryController().handle)

//--ROTAS PRODUCT --
router.post('/product', isAuthenticated, upload.single('file'), new CreateProductController().handle)
router.get('/products', isAuthenticated, new ListByCategoryController().handle)

//--ROTAS ORDER -- 
router.post('/order', isAuthenticated, new CreateOrderController().handle)
router.delete('/order', isAuthenticated, new RemoveOrderController().handle)
router.post('/order/addItem', isAuthenticated, new AddItemController().handle)
router.delete('/order/removeItem', isAuthenticated, new RemoveItemController().handle)
router.put('/order/send', isAuthenticated, new SendOrderController().handle)
router.get('/orders', isAuthenticated, new ListOrderController().handle)
router.get('/order/details', isAuthenticated, new DetailOrderController().handle)
router.put('/order/finish', isAuthenticated, new FinshOrderController().handle)

export {router};