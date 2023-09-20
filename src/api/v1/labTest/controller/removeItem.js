const labTestService = require('../../../../lib/labTestService')

const removeItem = async (req, res, next) => {
  const { id } = req.params

  try {
    await labTestService.removeItem(id)
    res.status(204).end()
  } catch (e) {
    next(e)
  }
}

module.exports = removeItem
