const {Router} = require('express')
const {cartsController} = require('../controllers/carts.controller');
const authMiddlewares = require('../middlewares/auth.middlewares');

const router = Router()

router.get('/carts', cartsController.getAllCarts);
router.get('/carts/:id', cartsController.getCartById);
router.post('/carts', cartsController.addCart);
router.patch('/carts/add/:id', cartsController.addCartItem)
router.patch('/carts/delete/:id', cartsController.deleteCartItem)
router.patch('/carts/product/increment/:id', cartsController.increaseProductAmoutn)
router.delete('/carts/:id', cartsController.deleteCart)

module.exports = router;