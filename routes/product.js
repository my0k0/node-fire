import express from "express";
import * as productController from '../controllers/product.js'
const router = express.Router()

router.get('/', productController.getProducts)
router.post('/new', productController.createProduct)
router.get('/product/:id', productController.getProduct)
router.put('/product/:id', productController.updateProduct)
router.delete('/product/:id', productController.deleteProduct)

export default router