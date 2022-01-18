const {Router} = require('express')
const {cartsController} = require('../controllers/carts.controller')
const authMiddleWare = require('../middleweares/auth.middleware')
const router = Router()

router.get('/carts',authMiddleWare, cartsController.getCartById);
router.post('/carts',authMiddleWare, cartsController.cartToken);
router.patch('/carts/:id',authMiddleWare, cartsController.updateCart)
router.delete('/carts/:id',authMiddleWare, cartsController.deleteCart)

module.exports = router;