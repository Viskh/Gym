const { Router } = require('express')

const router = Router()

router.use(require('./subscriptions.route'))
router.use(require('./trainers.route'))
router.use(require('./carts.route'))
router.use(require('./users.route'))
router.use(require('./products.route'))

module.exports = router