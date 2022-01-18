const {Router} = require('express')
const {cartsController} = require('../controllers/carts.controller')
const {authMiddleWare} = require('../middleweares/auth.middleware')
const router = Router()

router.get('/users/carts/', authMiddleWare, cartsController.getCartById);
router.post('/users/carts/', authMiddleWare, cartsController.cartToken);
router.patch('/users/carts/:id', authMiddleWare, cartsController.updateCart)
router.delete('/users/:id', authMiddleWare, cartsController.deleteCart)