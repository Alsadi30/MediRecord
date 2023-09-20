const { notFound } = require('./error')

const findModelAddId = async (model, modelId, path, id) => {
  const item = await model.findById(modelId)

  if (!item) {
    throw notFound()
  }

  item[path] = id

  await item.save()

  return item
}

module.exports = findModelAddId
