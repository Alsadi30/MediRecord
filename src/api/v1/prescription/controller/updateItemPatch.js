const prescriptionService = require('../../../../lib/prescriptionService')

const updateItemPatch = async (req, res, next) => {
  const { id } = req.params

  try {
    const prescirption = await prescriptionService.updateProperties(
      id,
      req.body
    )

    const response = {
      code: 200,
      message: 'Prescription updated successfully',
      data: prescirption,
      links: {
        self: `/prescirption/${prescirption.id}`
      }
    }

    res.status(200).json(response)
  } catch (e) {
    next(e)
  }
}

module.exports = updateItemPatch
