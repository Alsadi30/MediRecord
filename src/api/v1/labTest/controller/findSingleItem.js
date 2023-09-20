const labTestService = require('../../../../lib/labTestService')

const findSingleItem = async (req, res, next) => {
  const id = req.params.id
  const expand = req.query.expand || ''

  try {
    const labTest = await labTestService.findSingleItem({
      id,
      expand
    })
    const response = {
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

module.exports = findSingleItem
