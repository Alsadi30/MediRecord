const router = require('express').Router()
const authController = require('../api/v1/auth/controller')

router.post('/signup', authController.signup)
router.post('/login', authController.login)

module.exports = router
