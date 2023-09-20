const medicineService = require('../../../../lib/medicineService')

const findSingleItem = async (req, res, next) => {
  const id = req.params.id
  const expand = req.query.expand || ''

  try {
    const medicine = await medicineService.findSingleItem({
      id,
      expand
    })
    const response = {
      data: medicine,
      links: {
        self: `/medicine/${medicine.id}`
      }
    }

    res.status(200).json(response)
  } catch (e) {
    next(e)
  }
}

module.exports = findSingleItem
