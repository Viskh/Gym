const {Router} = require('express')
const { productsController } = require('../controllers/products.controller')
const addProductMiddleware = require('../middlewares/addProduct.middleware')
const router = Router()

router.post('/admin/products', productsController.addProduct)
router.get('/users/products', productsController.getAllProducts)
router.patch('/admin/products/:id', productsController.updateProduct)
router.delete('/admin/products/:id', productsController.deleteProduct)
router.patch('/admin/products/image/:id', addProductMiddleware.single('img'), productsController.updateImage)

module.exports = router