const router = require('express').Router()
const { signup, login } = require('../api/v1/auth/controller')

router.post('/auth/signup', signup)
router.post('/auth/login', login)

module.exports = router
