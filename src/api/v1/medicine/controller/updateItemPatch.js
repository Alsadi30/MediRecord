const medicineService = require('../../../../lib/medicineService')

const updateItemPatch = async (req, res, next) => {
  const { id } = req.params

  try {
    const medicine = await medicineService.updateProperties(id, req.body)

    const response = {
      code: 200,
      message: 'Medicine updated successfully',
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

module.exports = updateItemPatch
