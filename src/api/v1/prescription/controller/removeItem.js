const prescriptionService = require('../../../../lib/prescriptionService')

const removeItem = async (req, res, next) => {
  const { id } = req.params

  try {
    await prescriptionService.removeItem(id)
    res.status(204).end()
  } catch (e) {
    next(e)
  }
}

module.exports = removeItem
