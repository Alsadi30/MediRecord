const { LabTest } = require('../../../../model')
const count = require('../../../../utils/count')
const labTestService = require('../../../../lib/labTestService')
const { query } = require('../../../../utils')
const defaults = require('../../../../config/defaults')

const findAllItems = async (req, res, next) => {
  const page = req.query.page || defaults.page
  const limit = req.query.limit || defaults.limit
  const search = req.query.search || defaults.search
  const searchBy = req.query.searchBy || defaults.searchBy
  const Model = LabTest
  try {
    // data
    const labTest = await labTestService.findAll({
      page,
      limit,
      search,
      searchBy,
      Model
    })

    const data = query.getTransformedItems({
      items: labTest,
      path: '/lab-test',
      selection: [
        'id',
        'test_name',
        'test_result',
        'normal_result',
        'consultant_visit_id',
        'comment',
        'date',
        'test_type',
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
