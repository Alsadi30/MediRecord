const consultantVisitService = require('../../../../lib/consultantVisitService')

/**
 * Create a new consultant visit record.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {function} next - The next middleware function.
 */

const create = async (req, res, next) => {
  const { consultant_name, consultant, visit_no, date } = req.body
  const user = req.user.id

  try {
    // Create a new consultant visit using the consultantVisitService.
    const consultantVisit = await consultantVisitService.create({
      consultant_name,
      consultant,
      visit_no,
      date,
      user
    })

    // Prepare the response object with a success message, data, and links.
    const response = {
      code: 201,
      message: 'ConsultantVisit Created Successfully',
      data: { ...consultantVisit },
      links: {
        self: `/consultant-visit/${consultantVisit.id}`
      }
    }

    // Send a JSON response with HTTP status 201 (Created).
    res.status(201).json(response)
  } catch (e) {
    next(e)
  }
}

module.exports = create
