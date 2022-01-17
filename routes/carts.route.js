const {Router} = require('express')
const {cartsController} = require('../controllers/carts.controller')

const router = Router()

router.get('/users/carts/', authMidlleware, cartsController.getCartById);
router.post('/users/carts/', authMidlleware, cartsController.cartToken);
router.patch('/users/carts/:id', authMidlleware, cartsController.updateCart)
router.delete('/users/:id', authMidlleware, cartsController.deleteCart)