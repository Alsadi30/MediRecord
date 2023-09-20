const { ConsultantVisit } = require('../../model')
const defaults = require('../../config/defaults')
const { notFound } = require('../../utils/error')

const findAll = async ({
  page = defaults.page,
  limit = defaults.limit,
  search = defaults.search,
  searchBy = defaults.searchBy
}) => {
  const filter = {
    [searchBy]: { $regex: search, $options: 'i' }
  }

  const consultantVisits = await ConsultantVisit.find(search ? filter : {})
    .populate({ path: 'consultant', select: 'name' })
    .skip(page * limit - limit)
    .limit(limit)

  return consultantVisits.map(consultantVisit => ({
    ...consultantVisit._doc,
    id: consultantVisit.id
  }))
}

const create = async ({ consultant_name, consultant, visit_no, date }) => {
  if (!consultant_name || !consultant || !visit_no || !date) {
    const error = new Error('Invalid parameters')
    error.status = 400
    throw error
  }

  const consultantvisit = new ConsultantVisit({
    consultant_name,
    consultant,
    visit_no,
    date
  })

  await consultantvisit.save()
  return {
    ...consultantvisit._doc,
    id: consultantvisit.id
  }
}

const findSingleItem = async ({ id, expand = '' }) => {
  if (!id) throw new Error('Id is required')

  expand = expand.split(',').map(item => item.trim())

  const consultantVisit = await ConsultantVisit.findById(id)
  if (!consultantVisit) {
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
    ...consultantVisit._doc,
    id: consultantVisit.id
  }
}

const updateProperties = async (
  id,
  { consultant_name, consultant, visit_no, date }
) => {
  const consultantVisit = await ConsultantVisit.findById(id)
  if (!consultantVisit) {
    throw notFound()
  }

  const payload = { consultant_name, consultant, visit_no, date }

  Object.keys(payload).forEach(key => {
    consultantVisit[key] = payload[key] ?? consultantVisit[key]
  })

  await consultantVisit.save()
  return { ...consultantVisit._doc, id: consultantVisit.id }
}

const removeItem = async id => {
  const consultantVisit = await ConsultantVisit.findById(id)
  if (!consultantVisit) {
    throw notFound()
  }

  return ConsultantVisit.findByIdAndDelete(id)
}

module.exports = {
  findAll,
  create,
  findSingleItem,
  updateProperties,
  removeItem
  // checkOwnership,
}
