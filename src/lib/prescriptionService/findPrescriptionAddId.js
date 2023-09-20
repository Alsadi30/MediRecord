const { Prescription } = require('../../model')
const { notFound } = require('../../utils/error')

const findPrescriptionAddId = async (prescriptionId, path, id) => {
  const item = await Prescription.findById(prescriptionId)

  if (!item) {
    throw notFound()
  }

  item[path] = id

  await item.save()

  return item
}

module.exports = findPrescriptionAddId
