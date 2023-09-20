const router = require('express').Router()
const consultantVisitRoute = require('./consultantVisitRoute')
const authRoute = require('./authRoute')
const generalConditionRoute = require('./generalConditionRoute')
const labTestRoute = require('./labTestRoute')
const prescriptionRoute = require('./prescriptionRoute')
const medicineRoute = require('./medicineRoute')

router.use('/auth', authRoute)
router.use('/', consultantVisitRoute)
router.use('/', generalConditionRoute)
router.use('/', labTestRoute)
router.use('/', prescriptionRoute)
router.use('/', medicineRoute)

module.exports = router
