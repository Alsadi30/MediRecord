const generalConditionService = require('../../../../lib/generalConditionService')

const findSingleItem = async (req, res, next) => {
  const id = req.params.id
  const expand = req.query.expand || ''

  try {
    const generalCondition = await generalConditionService.findSingleItem({
      id,
      expand
    })
    const response = {
      data: generalCondition,
      links: {
        self: `/general-condition/${generalCondition.id}`
      }
    }

    res.status(200).json(response)
  } catch (e) {
    next(e)
  }
}

module.exports = findSingleItem
