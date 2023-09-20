const router = require('express').Router()
const medicine = require('../api/v1/medicine/controller')
const authenticate = require('../middleware/authenticate')
const { Medicine: MedicineModel } = require('../model')
const timeInterval = require('../utils/timeInterval')

router.get('/medicine', authenticate, medicine.findAllItems)
router.post('/medicine', authenticate, medicine.create)
router.get('/medicine/:id', authenticate, medicine.findSingleItem)
router.patch(
  '/medicine/:id',
  authenticate,
  timeInterval(MedicineModel),
  medicine.updateItemPatch
)
router.delete(
  '/medicine/:id',
  authenticate,
  timeInterval(MedicineModel),
  medicine.removeItem
)

module.exports = router
