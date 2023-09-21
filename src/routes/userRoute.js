const router = require('express').Router()
const userController = require('../api/v1/user/controller')

router.get('/consultant', userController.findAllItems)
router.get('/consultant/:id', userController.findSingleItem)
module.exports = router
