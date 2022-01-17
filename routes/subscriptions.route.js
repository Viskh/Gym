const { Router } = require('express')
const { subscriptionsController } = require('../controllers/subscriptions.controller')

const router = Router()

router.get('/users/subscriptions', subscriptionsController.getAllSubscriptions)
router.post('/admin/subscriptions', subscriptionsController.creareSubscription)

module.exports = router