const { GeneralCondition } = require('../../../../model')
const count = require('../../../../utils/count')
const generalConditionService = require('../../../../lib/generalConditionService')
const { query } = require('../../../../utils')
const defaults = require('../../../../config/defaults')

const findAllItems = async (req, res, next) => {
  const page = req.query.page || defaults.page
  const limit = req.query.limit || defaults.limit
  const search = req.query.search || defaults.search
  const searchBy = req.query.searchBy || defaults.searchBy
  const Model = GeneralCondition
  const user = req.user.id
  try {
    // data
    const generalCondition = await generalConditionService.findAll({
      page,
      limit,
      search,
      searchBy,
      Model,
      user
    })

    const data = query.getTransformedItems({
      items: generalCondition,
      path: '/general-condition',
      selection: [
        'id',
        'sign_symptom',
        'consultant_visit_id',
        'BP',
        'pulse',
        'weight',
        'age',
        'body_condition',
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
