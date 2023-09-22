const router = require('express').Router()
const consultantVisitRoute = require('./consultantVisitRoute')
const authRoute = require('./authRoute')
const generalConditionRoute = require('./generalConditionRoute')
const labTestRoute = require('./labTestRoute')
const prescriptionRoute = require('./prescriptionRoute')
const medicineRoute = require('./medicineRoute')
const userRoute = require('./userRoute')

router.use('/api/v1', authRoute)
router.use('/api/v1', consultantVisitRoute)
router.use('/api/v1', generalConditionRoute)
router.use('/api/v1', labTestRoute)
router.use('/api/v1', prescriptionRoute)
router.use('/api/v1', medicineRoute)
router.use('/api/v1', userRoute)

module.exports = router
