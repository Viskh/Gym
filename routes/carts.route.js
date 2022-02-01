const {Router} = require('express')
const {cartsController} = require('../controllers/carts.controller');
const authMiddlewares = require('../middlewares/auth.middlewares');

const router = Router()

router.get('/carts', cartsController.getAllCarts);
router.get('/carts/:id', cartsController.getCartById);
router.post('/carts', cartsController.addCart);
router.patch('/carts/add/:id', cartsController.addCartItem)
router.patch('/carts/add/trainer/:id', cartsController.addTrainerCart)
router.patch('/carts/add/subscription/in/:id', cartsController.addCartSubscription)
router.patch('/carts/delete/item/:id', cartsController.deleteCartItem)
router.patch('/carts/product/increment/:id', cartsController.increaseProductAmount)
router.patch('/carts/product/decrement/:id', cartsController.decreaseProductAmount)
router.patch('/carts/delete/:id', cartsController.deleteCart)

module.exports = router;