const { Medicine } = require('../../../../model')
const count = require('../../../../utils/count')
const medicineService = require('../../../../lib/medicineService')
const { query } = require('../../../../utils')
const defaults = require('../../../../config/defaults')

const findAllItems = async (req, res, next) => {
  const page = req.query.page || defaults.page
  const limit = req.query.limit || defaults.limit
  const search = req.query.search || defaults.search
  const searchBy = req.query.searchBy || defaults.searchBy
  const Model = Medicine
  try {
    // data
    const medicine = await medicineService.findAll({
      page,
      limit,
      search,
      searchBy,
      Model
    })

    const data = query.getTransformedItems({
      items: medicine,
      path: '/medicine',
      selection: [
        'id',
        'medicine_name',
        'dose',
        'duration',
        'prescription',
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
