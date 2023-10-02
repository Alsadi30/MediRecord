const consultantVisitService = require('../../../../lib/consultantVisitService')

/**
 * Find a single consultant visit by ID with optional data expansion.
 *
 * @param {object} req - The request object containing request data.
 * @param {object} res - The response object for sending the server response.
 * @param {function} next - The next middleware function for error handling.
 */

const findSingleItem = async (req, res, next) => {
  // Extract the ID and optional 'expand' query parameter from the request
  const id = req.params.id
  const expand = req.query.expand || ''

  try {
    // Use the consultantVisitService to find a single consultant visit by ID
    const consultantVisit = await consultantVisitService.findSingleItem({
      id,
      expand
    })

    // Prepare the response object with data and links
    const response = {
      data: consultantVisit,
      links: {
        self: `/consultant-visit/${consultantVisit.id}`
      }
    }

    // Send a successful response with status code 200
    res.status(200).json(response)
  } catch (e) {
    next(e)
  }
}

module.exports = findSingleItem
