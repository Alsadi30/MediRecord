const { ConsultantVisit } = require('../../../../model')
const count = require('../../../../utils/count')
const consultantVisitService = require('../../../../lib/consultantVisitService')
const { query } = require('../../../../utils')
const defaults = require('../../../../config/defaults')

/**
 * Find all consultant visit items based on query parameters.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {function} next - The next middleware function for error handling.
 */
const findAllItems = async (req, res, next) => {
  const page = req.query.page || defaults.page
  const limit = req.query.limit || defaults.limit
  const search = req.query.search || defaults.search
  const searchBy = req.query.searchBy || defaults.searchBy
  const Model = ConsultantVisit
  try {
    // Find consultant visit items using the consultantVisitService
    const consultantVisit = await consultantVisitService.findAll({
      page,
      limit,
      search,
      searchBy,
      Model,
      user: req.user.id // Associate the user with the request
    })

    // Transform and select specific fields for the response data
    const data = query.getTransformedItems({
      items: consultantVisit,
      path: '/consultant-visit',
      selection: [
        'id',
        'consultant_name',
        'cosultant',
        'visit_no',
        'date',
        'updatedAt',
        'createdAt'
      ]
    })

    // Count the total number of items for pagination
    const totalItems = await count({ search, searchBy, Model })

    // Generate pagination information
    const pagination = query.getPagination({ totalItems, limit, page })

    // Generate HATEOAS Links for navigation
    const links = query.getHATEOASForAllItems({
      url: req.url,
      path: req.path,
      query: req.query,
      hasNext: !!pagination.next,
      hasPrev: !!pagination.prev,
      page
    })

    // Send a JSON response with the data, pagination, and links
    res.status(200).json({
      data,
      pagination,
      links
    })
  } catch (e) {
    next(e)
  }
}

module.exports = findAllItems
