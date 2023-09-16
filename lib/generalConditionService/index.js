const { GeneralCondition } = require('../../model')
const defaults = require('../../config/defaults')
const { badRequest, notFound, serverError } = require('../../utils/error')

const findAll = async ({
  page = defaults.page,
  limit = defaults.limit,
  search = defaults.search,
  searchBy = defaults.searchBy
}) => {
  const filter = {
    [searchBy]: { $regex: search, $options: 'i' }
  }

  const generalConditions = await GeneralCondition.find(search ? filter : {})
    // .populate({ path: 'consultant', select: 'name' })
    .skip(page * limit - limit)
    .limit(limit)

  return generalConditions.map(generalConditions => ({
    ...generalConditions._doc,
    id: generalConditions.id
  }))
}

const create = async ({
  sign_symptom,
  consultant_visit_id,
  BP,
  pulse,
  weight,
  age,
  body_condition
}) => {
  console.log(
    sign_symptom,
    consultant_visit_id,
    BP,
    pulse,
    weight,
    age,
    body_condition
  )
  if (
    !sign_symptom ||
    !consultant_visit_id ||
    !BP ||
    !pulse ||
    !weight ||
    !age ||
    !body_condition
  ) {
    const error = new Error('Invalid parameters')
    error.status = 400
    throw error
  }

  const generalCondition = new GeneralCondition({
    sign_symptom,
    consultant_visit_id,
    BP,
    pulse,
    weight,
    age,
    body_condition
  })

  await generalCondition.save()
  return {
    ...generalCondition._doc,
    id: generalCondition.id
  }
}

const findSingleItem = async ({ id, expand = '' }) => {
  if (!id) throw new Error('Id is required')

  expand = expand.split(',').map(item => item.trim())

  const generalCondition = await GeneralCondition.findById(id)
  if (!generalCondition) {
    throw notFound()
  }

  // if (expand.includes('c')) {
  // 	await consultantVisit.populate({
  // 		path: 'prescription',
  // 		select: 'name',
  // 		strictPopulate: false,
  // 	});
  // }

  return {
    ...generalCondition._doc,
    id: generalCondition.id
  }
}

const updateProperties = async (
  id,
  { sign_symptom, consultant_visit_id, BP, pulse, weight, age, body_condition }
) => {
  const generalCondition = await GeneralCondition.findById(id)
  if (!generalCondition) {
    throw notFound()
  }

  const payload = {
    sign_symptom,
    consultant_visit_id,
    BP,
    pulse,
    weight,
    age,
    body_condition
  }

  Object.keys(payload).forEach(key => {
    generalCondition[key] = payload[key] ?? generalCondition[key]
  })

  await generalCondition.save()
  return { ...generalCondition._doc, id: generalCondition.id }
}

const removeItem = async id => {
  const generalCondition = await GeneralCondition.findById(id)
  if (!generalCondition) {
    throw notFound()
  }

  return GeneralCondition.findByIdAndDelete(id)
}

module.exports = {
  findAll,
  create,
  findSingleItem,
  updateProperties,
  removeItem
  // checkOwnership,
}
