const {
  Prescription,
  Medicine,
  ConsultantVisit,
  GeneralCondition
} = require('../../model')
const defaults = require('../../config/defaults')
const { notFound } = require('../../utils/error')
const findModelAddId = require('../../utils/findModelAndAddId')

const findAll = async ({
  page = defaults.page,
  limit = defaults.limit,
  search = defaults.search,
  searchBy = defaults.searchBy,
  user
}) => {
  const filter = {
    [searchBy]: { $regex: search, $options: 'i' },
    user
  }

  const prescription = await Prescription.find(search ? filter : { user })
    .populate({
      path: 'consultant_visit_id',
      select: ['consultant_name', 'visit_no'],
      strictPopulate: false
    })
    .skip(page * limit - limit)
    .limit(limit)

  return prescription.map(prescription => ({
    ...prescription._doc,
    id: prescription.id
  }))
}

const create = async ({
  diagnosis,
  advice,
  nextdate,
  consultant_visit_id,
  general_condition,
  user
}) => {
  console.log(
    diagnosis,
    advice,
    nextdate,
    consultant_visit_id,
    general_condition,
    user
  )
  if (
    !diagnosis ||
    !advice ||
    !nextdate ||
    !consultant_visit_id ||
    !general_condition ||
    !user
  ) {
    const error = new Error('Invalid parameters')
    error.status = 400
    throw error
  }

  const prescription = new Prescription({
    diagnosis,
    advice,
    nextdate,
    general_condition,
    consultant_visit_id,
    user
  })

  await prescription.save()

  await findModelAddId(
    ConsultantVisit,
    consultant_visit_id,
    'prescription',
    prescription.id
  )

  await findModelAddId(
    GeneralCondition,
    general_condition,
    'prescription',
    prescription.id
  )

  return {
    ...prescription._doc,
    id: prescription.id
  }
}

const findSingleItem = async ({ id, expand = '' }) => {
  if (!id) throw new Error('Id is required')

  expand = expand.split(',').map(item => item.trim())

  const prescription = await Prescription.findById(id)

  if (!prescription) {
    throw notFound()
  }

  if (expand.includes('medicine')) {
    await prescription.populate({
      path: 'medicines',
      strictPopulate: false
    })
  }

  if (expand.includes('lab-test')) {
    await prescription.populate({
      path: 'labtests',
      strictPopulate: false
    })
  }

  if (expand.includes('general-condition')) {
    await prescription.populate({
      path: 'general_condition',
      strictPopulate: false
    })
  }

  if (expand.includes('consultant-visit')) {
    await prescription.populate({
      path: 'consultant_visit_id',
      select: ['consultant_name', 'visit_no'],
      strictPopulate: false
    })
  }

  return {
    ...prescription._doc,
    id: prescription.id
  }
}

const updateProperties = async (
  id,
  { diagnosis, advice, nextdate, consultant }
) => {
  const prescription = await Prescription.findById(id)
  if (!prescription) {
    throw notFound()
  }

  const payload = {
    diagnosis,
    advice,
    nextdate,
    consultant
  }

  Object.keys(payload).forEach(key => {
    prescription[key] = payload[key] ?? prescription[key]
  })

  await prescription.save()
  return { ...prescription._doc, id: prescription.id }
}

const removeItem = async id => {
  const prescription = await Prescription.findById(id)
  if (!prescription) {
    throw notFound()
  }

  return Prescription.findByIdAndDelete(id)
}

module.exports = {
  findAll,
  create,
  findSingleItem,
  updateProperties,
  removeItem
  // checkOwnership,
}
