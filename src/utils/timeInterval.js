const { notFound, authorizationError } = require('./error')

const timeInterval = Model => async (req, _res, next) => {
  const id = req.params.id
  const item = await Model.findById(id)

  if (!item) {
    throw notFound()
  }

  const presentTime = new Date()
  const creationTime = new Date(item.createdAt)
  const difference =
    (presentTime.getTime() - creationTime.getTime()) / (1000 * 3600)

  if (difference > 24) {
    next(authorizationError())
  }

  next()
}

module.exports = timeInterval
