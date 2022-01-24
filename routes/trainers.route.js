const {Router} = require('express')
const {trainersController} = require('../controllers/trainers.controller')
const authMiddlewares = require('../middlewares/auth.middlewares')
const router = Router()

router.post('/admin/trainers', trainersController.createTrainer)
router.get('/users/trainers', trainersController.getAllTrainers)
router.patch('/admin/trainers/:id', trainersController.updateTrainer)
router.delete('/admin/trainers/:id', trainersController.deleteTrainer)

module.exports = router