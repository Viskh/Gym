const {Router} = require('express')
const {cartsController} = require('../controllers/carts.controller');
const authMiddlewares = require('../middlewares/auth.middlewares');

const router = Router()

router.get('/carts', authMiddlewares, cartsController.getCartById);
router.post('/carts', authMiddlewares, cartsController.cartToken);
router.patch('/carts/:id', authMiddlewares, cartsController.updateCart)
router.delete('/carts/:id', authMiddlewares, cartsController.deleteCart)

module.exports = router;