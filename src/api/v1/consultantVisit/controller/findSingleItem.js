const consultantVisitService = require('../../../../lib/consultantVisitService')

const findSingleItem = async (req, res, next) => {
  const id = req.params.id
  const expand = req.query.expand || ''

  try {
    const consultantVisit = await consultantVisitService.findSingleItem({
      id,
      expand
    })
    const response = {
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

module.exports = findSingleItem
