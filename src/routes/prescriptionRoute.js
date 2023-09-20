const router = require('express').Router()
const prescription = require('../api/v1/prescription/controller')
const authenticate = require('../middleware/authenticate')
const { Prescription: PrescriptionModel } = require('../model')
const timeInterval = require('../utils/timeInterval')

router.get('/prescription', authenticate, prescription.findAllItems)
router.post('/prescription', authenticate, prescription.create)
router.get('/prescription/:id', authenticate, prescription.findSingleItem)
router.patch(
  '/prescription/:id',
  authenticate,
  timeInterval(PrescriptionModel),
  prescription.updateItemPatch
)
router.delete(
  '/prescription/:id',
  authenticate,
  timeInterval(PrescriptionModel),
  prescription.removeItem
)

module.exports = router
