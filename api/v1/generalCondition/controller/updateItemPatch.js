const generalConditionService = require('../../../../lib/generalConditionService')

const updateItemPatch = async (req, res, next) => {
  const { id } = req.params

  try {
    const generalCondition = await generalConditionService.updateProperties(
      id,
      req.body
    )

    const response = {
      code: 200,
      message: 'General Condition updated successfully',
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

module.exports = updateItemPatch
