const { Medicine, Prescription } = require('../../model')
const defaults = require('../../config/defaults')
const { notFound } = require('../../utils/error')
const findPrescriptionAddId = require('../prescriptionService/findPrescriptionAddId')

const findAll = async ({
  page = defaults.page,
  limit = defaults.limit,
  search = defaults.search,
  searchBy = defaults.searchBy
}) => {
  const filter = {
    [searchBy]: { $regex: search, $options: 'i' }
  }

  const medicine = await Medicine.find(search ? filter : {})
    .skip(page * limit - limit)
    .limit(limit)

  return medicine.map(medicine => ({
    ...medicine._doc,
    id: medicine.id
  }))
}

const create = async ({ medicine_name, dose, duration, prescription }) => {
  console.log(medicine_name, dose, duration, prescription)
  if (!medicine_name || !dose || !duration || !prescription) {
    const error = new Error('Invalid parameters')
    error.status = 400
    throw error
  }

  const medicine = new Medicine({
    medicine_name,
    dose,
    duration,
    prescription
  })

  await medicine.save()

  // medicine id attaching with prescription
  await findPrescriptionAddId(prescription, 'medicines', medicine.id)

  return {
    ...medicine._doc,
    id: medicine.id
  }
}

const findSingleItem = async ({ id }) => {
  if (!id) throw new Error('Id is required')

  const medicine = await Medicine.findById(id)
  if (!medicine) {
    throw notFound()
  }

  return {
    ...medicine._doc,
    id: medicine.id
  }
}

const updateProperties = async (
  id,
  { medicine_name, dose, duration, prescription }
) => {
  const medicine = await Medicine.findById(id)
  if (!medicine) {
    throw notFound()
  }

  const payload = {
    medicine_name,
    dose,
    duration,
    prescription
  }

  Object.keys(payload).forEach(key => {
    medicine[key] = payload[key] ?? medicine[key]
  })

  await medicine.save()
  return { ...medicine._doc, id: medicine.id }
}

const removeItem = async id => {
  const medicine = await Medicine.findById(id)
  if (!medicine) {
    throw notFound()
  }

  return Medicine.findByIdAndDelete(id)
}

module.exports = {
  findAll,
  create,
  findSingleItem,
  updateProperties,
  removeItem
  // checkOwnership,
}
