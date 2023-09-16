const consultantVisitService = require('../../../../lib/consultantVisitService')

const removeItem = async (req, res, next) => {
  const { id } = req.params

  try {
    await consultantVisitService.removeItem(id)
    res.status(204).end()
  } catch (e) {
    next(e)
  }
}

module.exports = removeItem
