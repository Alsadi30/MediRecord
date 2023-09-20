const prescriptionService = require('../../../../lib/prescriptionService')

const findSingleItem = async (req, res, next) => {
  const id = req.params.id
  const expand = req.query.expand || ''

  try {
    const prescription = await prescriptionService.findSingleItem({
      id,
      expand
    })
    const response = {
      data: prescription,
      links: {
        self: `/prescription/${prescription.id}`
      }
    }

    res.status(200).json(response)
  } catch (e) {
    next(e)
  }
}

module.exports = findSingleItem
