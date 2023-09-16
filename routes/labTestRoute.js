const router = require('express').Router()
const LabTest = require('../api/v1/labTest/controller')

router.get('/lab-test', LabTest.findAllItems)
router.post('/lab-test', LabTest.create)
router.get('/lab-test/:id', LabTest.findSingleItem)
router.patch('/lab-test/:id', LabTest.updateItemPatch)
router.delete('/lab-test/:id', LabTest.removeItem)

module.exports = router
