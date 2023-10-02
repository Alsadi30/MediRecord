const consultantVisitService = require('../../../../lib/consultantVisitService')

/**
 * Remove a consultant visit record by ID.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {function} next - The next middleware function for error handling.
 */

const removeItem = async (req, res, next) => {
  // Extract the 'id' parameter from the request parameters
  const { id } = req.params

  try {
    // Call the 'removeItem' function from the 'consultantVisitService' to delete the consultant visit
    await consultantVisitService.removeItem(id)

    // Respond with a status code 204 (No Content) to indicate successful deletion
    res.status(204).end()
  } catch (e) {
    next(e)
  }
}

module.exports = removeItem
