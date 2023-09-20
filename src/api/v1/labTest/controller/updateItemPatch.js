const labTestService = require('../../../../lib/labTestService')

const updateItemPatch = async (req, res, next) => {
  const { id } = req.params

  try {
    const labTest = await labTestService.updateProperties(id, req.body)

    const response = {
      code: 200,
      message: 'Lab Test updated successfully',
      data: labTest,
      links: {
        self: `/lab-test/${labTest.id}`
      }
    }

    res.status(200).json(response)
  } catch (e) {
    next(e)
  }
}

module.exports = updateItemPatch
