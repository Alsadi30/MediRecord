const { Prescription } = require('../../../../model')
const count = require('../../../../utils/count')
const prescriptionService = require('../../../../lib/prescriptionService')
const { query } = require('../../../../utils')
const defaults = require('../../../../config/defaults')

const findAllItems = async (req, res, next) => {
  const page = req.query.page || defaults.page
  const limit = req.query.limit || defaults.limit
  const search = req.query.search || defaults.search
  const searchBy = req.query.searchBy || defaults.searchBy
  const Model = Prescription
  const user = req.user.id

  try {
    // data
    const prescription = await prescriptionService.findAll({
      page,
      limit,
      search,
      searchBy,
      user
    })

    const data = query.getTransformedItems({
      items: prescription,
      path: '/prescription',
      selection: [
        'id',
        'diagnosis',
        'advice',
        'nextdate',
        'consultant',
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
