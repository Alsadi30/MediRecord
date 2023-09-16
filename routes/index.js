const router = require('express').Router()
const authRoutes = require('./authRoute')
const consultantRoute = require('./consultantVisitRoute')
const generalCondition = require('./generalConditionRoute')
const labTest = require('./labTestRoute')

router.use('/', authRoutes)
router.use('/', consultantRoute)
router.use('/', generalCondition)
router.use('/', labTest)

module.exports = router
