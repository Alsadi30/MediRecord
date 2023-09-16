const consultantVisitService = require('../../../../lib/consultantVisitService')

const create = async (req, res, next) => {
  const { consultant_name, consultant, visit_no, date } = req.body

  try {
    const consultantVisit = await consultantVisitService.create({
      consultant_name,
      consultant,
      visit_no,
      date
    })

    const response = {
      code: 201,
      message: 'ConsultantVisit Created Successfully',
      data: { ...consultantVisit },
      links: {
        self: `/consultant-visit/${consultantVisit.id}`
      }
    }

    res.status(201).json(response)
  } catch (e) {
    next(e)
  }
}

module.exports = create
