const generalConditionService = require('../../../../lib/generalConditionService')

const removeItem = async (req, res, next) => {
  const { id } = req.params

  try {
    await generalConditionService.removeItem(id)
    res.status(204).end()
  } catch (e) {
    next(e)
  }
}

module.exports = removeItem
