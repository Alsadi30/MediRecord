const router = require('express').Router()
const ConsultantVisit = require('../api/v1/consultantVisit/controller')
const authenticate = require('../middleware/authenticate')
const { ConsultantVisit: ConsultantVisitModel } = require('../model')
const timeInterval = require('../utils/timeInterval')

router.get('/consultant-visit', authenticate, ConsultantVisit.findAllItems)
router.post('/consultant-visit', authenticate, ConsultantVisit.create)
router.get(
  '/consultant-visit/:id',
  authenticate,
  ConsultantVisit.findSingleItem
)
router.patch(
  '/consultant-visit/:id',
  authenticate,
  timeInterval(ConsultantVisitModel),
  ConsultantVisit.updateItemPatch
)
router.delete(
  '/consultant-visit/:id',
  authenticate,
  timeInterval(ConsultantVisitModel),
  ConsultantVisit.removeItem
)

module.exports = router
