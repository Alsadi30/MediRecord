const medicineService = require('../../../../lib/medicineService')

const removeItem = async (req, res, next) => {
  const { id } = req.params

  try {
    await medicineService.removeItem(id)
    res.status(204).end()
  } catch (e) {
    next(e)
  }
}

module.exports = removeItem
