const router = require('express').Router()
const ConsultantVisit = require('../api/v1/consultantVisit/controller')

router.get('/consultant-visit', ConsultantVisit.findAllItems)
router.post('/consultant-visit', ConsultantVisit.create)
router.get('/consultant-visit/:id', ConsultantVisit.findSingleItem)
router.patch('/consultant-visit/:id', ConsultantVisit.updateItemPatch)
router.delete('/consultant-visit/:id', ConsultantVisit.removeItem)

module.exports = router
