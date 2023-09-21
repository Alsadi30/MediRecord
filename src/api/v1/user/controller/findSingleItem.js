const userService = require('../../../../lib/user')

const findSingleItem = async (req, res, next) => {
  const id = req.params.id

  try {
    const consultant = await userService.findSingleItem({
      id
    })
    const response = {
      data: consultant,
      links: {
        self: `/consultant/${consultant.id}`
      }
    }

    res.status(200).json(response)
  } catch (e) {
    next(e)
  }
}

module.exports = findSingleItem
