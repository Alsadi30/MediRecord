const consultantService = require('../../../../lib/consultantVisitService')

const updateItemPatch = async (req, res, next) => {
  const { id } = req.params

  try {
    const consultantVisit = await consultantService.updateProperties(
      id,
      req.body
    )

    const response = {
      code: 200,
      message: 'Consultant Visit updated successfully',
      data: consultantVisit,
      links: {
        self: `/consultant-visit/${consultantVisit.id}`
      }
    }

    res.status(200).json(response)
  } catch (e) {
    next(e)
  }
}

module.exports = updateItemPatch
