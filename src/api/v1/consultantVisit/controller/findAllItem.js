const { ConsultantVisit } = require('../../../../model')
const count = require('../../../../utils/count')
const consultantVisitService = require('../../../../lib/consultantVisitService')
const { query } = require('../../../../utils')
const defaults = require('../../../../config/defaults')

const findAllItems = async (req, res, next) => {
  const page = req.query.page || defaults.page
  const limit = req.query.limit || defaults.limit
  const search = req.query.search || defaults.search
  const searchBy = req.query.searchBy || defaults.searchBy
  const Model = ConsultantVisit
  try {
    // data
    const consultantVisit = await consultantVisitService.findAll({
      page,
      limit,
      search,
      searchBy,
      Model,
      user: req.user.id
    })

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

    // pagination
    const totalItems = await count({ search, searchBy, Model })
    const pagination = query.getPagination({ totalItems, limit, page })

    // HATEOAS Links
    const links = query.getHATEOASForAllItems({
      url: req.url,
      path: req.path,
      query: req.query,
      hasNext: !!pagination.next,
      hasPrev: !!pagination.prev,
      page
    })

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
