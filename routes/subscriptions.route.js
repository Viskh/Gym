const { Router } = require('express')
const { subscriptionsController } = require('../controllers/subscriptions.controller')
const authMiddlewares = require('../middlewares/auth.middlewares')

const router = Router()

router.get('/users/subscriptions', subscriptionsController.getAllSubscriptions)
router.post('/admin/subscriptions', authMiddlewares, subscriptionsController.creareSubscription)
router.delete('/admin/subscriptions/:id', authMiddlewares, subscriptionsController.deleteSubscription)

module.exports = router