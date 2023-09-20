const router = require('express').Router()
const LabTest = require('../api/v1/labTest/controller')
const authenticate = require('../middleware/authenticate')
const { LabTest: LabTestModel } = require('../model')
const timeInterval = require('../utils/timeInterval')

router.get('/lab-test', authenticate, LabTest.findAllItems)
router.post('/lab-test', authenticate, LabTest.create)
router.get('/lab-test/:id', authenticate, LabTest.findSingleItem)
router.patch(
  '/lab-test/:id',
  authenticate,
  timeInterval(LabTestModel),
  LabTest.updateItemPatch
)
router.delete(
  '/lab-test/:id',
  authenticate,
  timeInterval(LabTestModel),
  LabTest.removeItem
)

module.exports = router
