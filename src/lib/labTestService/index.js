const { LabTest } = require('../../model')
const defaults = require('../../config/defaults')
const { notFound } = require('../../utils/error')
const findPrescriptionAddId = require('../prescriptionService/findPrescriptionAddId')

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

  const labTest = await LabTest.find(search ? filter : { user })
    .populate({ path: 'consultant_visit_id', select: 'consultant_name' })
    .skip(page * limit - limit)
    .limit(limit)

  return labTest.map(labTest => ({
    ...labTest._doc,
    id: labTest.id
  }))
}

const create = async ({
  test_name,
  test_result,
  normal_result,
  consultant_visit_id,
  prescription,
  comment,
  date,
  test_type,
  user
}) => {
  if (
    !test_name ||
    !consultant_visit_id ||
    !prescription ||
    !test_result ||
    !normal_result ||
    !comment ||
    !date ||
    !test_type ||
    !user
  ) {
    const error = new Error('Invalid parameters')
    error.status = 400
    throw error
  }

  const labTest = new LabTest({
    test_name,
    test_result,
    prescription,
    normal_result,
    consultant_visit_id,
    comment,
    date,
    test_type,
    user
  })

  await labTest.save()

  await findPrescriptionAddId(prescription, 'labtests', labTest.id)

  return {
    ...labTest._doc,
    id: labTest.id
  }
}

const findSingleItem = async ({ id, expand = '' }) => {
  if (!id) throw new Error('Id is required')

  expand = expand.split(',').map(item => item.trim())

  const labTest = await LabTest.findById(id)

  if (!labTest) {
    throw notFound()
  }

  if (expand.includes('prescription')) {
    await labTest.populate({
      path: 'prescription',
      strictPopulate: false,
      populate: { path: 'medicines' }
    })
  }
  if (expand.includes('consultant-visit')) {
    await labTest.populate({
      path: 'consultant_visit_id',
      strictPopulate: false
    })
  }

  return {
    ...labTest._doc,
    id: labTest.id
  }
}

const updateProperties = async (
  id,
  {
    test_name,
    test_result,
    normal_result,
    prescription,
    consultant_visit_id,
    comment,
    date,
    test_type
  }
) => {
  const labTest = await LabTest.findById(id)
  if (!labTest) {
    throw notFound()
  }

  const payload = {
    test_name,
    test_result,
    normal_result,
    prescription,
    consultant_visit_id,
    comment,
    date,
    test_type
  }

  Object.keys(payload).forEach(key => {
    labTest[key] = payload[key] ?? labTest[key]
  })

  await labTest.save()
  return { ...labTest._doc, id: labTest.id }
}

const removeItem = async id => {
  const labTest = await LabTest.findById(id)
  if (!labTest) {
    throw notFound()
  }

  return LabTest.findByIdAndDelete(id)
}

module.exports = {
  findAll,
  create,
  findSingleItem,
  updateProperties,
  removeItem
  // checkOwnership,
}
