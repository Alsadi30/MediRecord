const consultantService = require('../../../../lib/consultantVisitService')

/**
 * Update a consultant visit record partially by ID.
 *
 * @param {string} id - The ID of the consultant visit to be updated.
 * @throws {Error} Throws an error if there's an issue with the update or if the consultant visit is not found.
 */

const updateItemPatch = async (req, res, next) => {
  // Extract the ID from the request parameters
  const { id } = req.params

  try {
    // Call the consultantService to update the consultant visit by its ID and request body
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
