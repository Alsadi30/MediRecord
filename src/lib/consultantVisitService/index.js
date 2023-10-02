const { ConsultantVisit } = require('../../model')
const defaults = require('../../config/defaults')
const { notFound } = require('../../utils/error')

/**
 * Find all consultant visits based on specified query parameters.
 *
 * @param {object} options - The options object containing query parameters.
 * @param {number} options.page - The page number for pagination (default is defaults.page).
 * @param {number} options.limit - The maximum number of items to return per page (default is defaults.limit).
 * @param {string} options.search - The search term to filter consultant visits (default is defaults.search).
 * @param {string} options.searchBy - The field to search by (default is defaults.searchBy).
 * @param {string} options.user - The user associated with the consultant visits.
 * @returns {Array} An array of consultant visit objects matching the criteria.
 */

const findAll = async ({
  page = defaults.page,
  limit = defaults.limit,
  search = defaults.search,
  searchBy = defaults.searchBy,
  user
}) => {
  // Define a filter to search for consultant visits based on search criteria and user
  const filter = {
    [searchBy]: { $regex: search, $options: 'i' },
    user
  }

  // Find consultant visits based on the filter and pagination options
  const consultantVisits = await ConsultantVisit.find(
    search ? filter : { user }
  )
    .skip(page * limit - limit)
    .limit(limit)

  // Map and transform the consultant visit objects and add an 'id' field
  return consultantVisits.map(consultantVisit => ({
    ...consultantVisit._doc,
    id: consultantVisit.id
  }))
}

/**
 * Create a new consultant visit record.
 *
 * @param {string} consultant_name - The name of the consultant.
 * @param {string} consultant - The ID of the consultant.
 * @param {string} visit_no - The visit number.
 * @param {string} date - The date of the visit.
 * @param {string} user - The user associated with the visit.
 * @throws {Error} Throws an error if any required parameter is missing.
 * @returns {object} The created consultant visit object.
 */

const create = async ({
  consultant_name,
  consultant,
  visit_no,
  date,
  user
}) => {
  // Check if any of the required parameters is missing.
  if (!consultant_name || !consultant || !visit_no || !date || !user) {
    const error = new Error('Invalid parameters')
    error.status = 400
    throw error
  }

  // Create a new consultant visit object.
  const consultantvisit = new ConsultantVisit({
    consultant_name,
    consultant,
    visit_no,
    date,
    user
  })

  // Save the consultant visit object to the database.
  await consultantvisit.save()

  // Return the created consultant visit object.
  return {
    ...consultantvisit._doc,
    id: consultantvisit.id
  }
}

/**
 * Find a single consultant visit by ID with optional data expansion.
 *
 * @param {object} params - The parameters object containing 'id' and 'expand' properties.
 * @param {string} params.id - The ID of the consultant visit to find.
 * @param {string} [params.expand=''] - A comma-separated list of data to expand (e.g., 'prescription').
 * @throws {Error} Throws an error if 'id' is missing or if the consultant visit is not found.
 * @returns {object} The found consultant visit object with expanded data.
 */

const findSingleItem = async ({ id, expand = '' }) => {
  // Check if 'id' is provided; it is required for the search
  if (!id) throw new Error('Id is required')

  // Split the 'expand' string into an array and trim whitespace from each item
  expand = expand.split(',').map(item => item.trim())

  // Find the consultant visit by its ID
  const consultantVisit = await ConsultantVisit.findById(id)

  // If the consultant visit is not found, throw a "not found" error
  if (!consultantVisit) {
    throw notFound()
  }

  // Check if 'prescription' is in the 'expand' list; if yes, populate related data
  if (expand.includes('prescription')) {
    await consultantVisit.populate({
      path: 'prescription',
      strictPopulate: false,
      populate: { path: 'medicines' }
    })
  }

  // Prepare the response object with the consultant visit data and its ID

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

/**
 * Remove a consultant visit record by ID.
 *
 * @param {string} id - The ID of the consultant visit to be removed.
 * @throws {Error} Throws an error if the consultant visit is not found.
 */

const removeItem = async id => {
  // Find the consultant visit by its ID
  const consultantVisit = await ConsultantVisit.findById(id)

  // Check if the consultant visit exists
  if (!consultantVisit) {
    // If not found, throw a 'notFound' error
    throw notFound()
  }

  // Delete the consultant visit by its ID
  return ConsultantVisit.findByIdAndDelete(id)
}

module.exports = {
  findAll,
  create,
  findSingleItem,
  updateProperties,
  removeItem
}
