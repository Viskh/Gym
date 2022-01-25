const { Router } = require('express')
const { subscriptionsController } = require('../controllers/subscriptions.controller')
const authMiddlewares = require('../middlewares/auth.middlewares')
const addSubMiddleware = require('../middlewares/addSub.middleware')
const router = Router()

router.get('/users/subscriptions', subscriptionsController.getAllSubscriptions)
router.post('/admin/subscriptions', subscriptionsController.creareSubscription)
router.delete('/admin/subscriptions/:id', subscriptionsController.deleteSubscription)
router.patch('/admin/subscriptions/image/:id', addSubMiddleware.single('img'), subscriptionsController.updateImage)

module.exports = router