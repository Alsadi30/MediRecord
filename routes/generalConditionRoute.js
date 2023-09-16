const router = require('express').Router()
const GeneralCondition = require('../api/v1/generalCondition/controller')

router.get('/general-condition', GeneralCondition.findAllItems)
router.post('/general-condition', GeneralCondition.create)
router.get('/general-condition/:id', GeneralCondition.findSingleItem)
router.patch('/general-condition/:id', GeneralCondition.updateItemPatch)
router.delete('/general-condition/:id', GeneralCondition.removeItem)

module.exports = router
