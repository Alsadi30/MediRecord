const router = require('express').Router()
const GeneralCondition = require('../api/v1/generalCondition/controller')
const authenticate = require('../middleware/authenticate')
const { GeneralCondition: GeneralConditionModel } = require('../model')
const timeInterval = require('../utils/timeInterval')

router.get('/general-condition', authenticate, GeneralCondition.findAllItems)
router.post('/general-condition', authenticate, GeneralCondition.create)
router.get(
  '/general-condition/:id',
  authenticate,
  GeneralCondition.findSingleItem
)
router.patch(
  '/general-condition/:id',
  authenticate,
  timeInterval(GeneralConditionModel),
  GeneralCondition.updateItemPatch
)
router.delete(
  '/general-condition/:id',
  authenticate,
  timeInterval(GeneralConditionModel),
  GeneralCondition.removeItem
)

module.exports = router
