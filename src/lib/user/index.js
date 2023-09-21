const User = require('../../model/user')

const findUserByEmail = async email => {
  const user = await User.findOne({ email })
  return user ? user : false
}

const userExist = async email => {
  const user = await findUserByEmail(email)
  return user ? true : false
}

const createUser = async ({
  name,
  email,
  password,
  phone,
  birthdate,
  role
}) => {
  const user = new User({ name, email, password, phone, birthdate, role })
  await user.save()
  return { ...user._doc, id: user.id }
}

const findAll = async ({
  page = defaults.page,
  limit = defaults.limit,
  search = defaults.search,
  searchBy = defaults.searchBy
}) => {
  const filter = {
    [searchBy]: { $regex: search, $options: 'i' },
    role: 'consultant'
  }

  const consultants = await User.find(search ? filter : { role: 'consultant' })
    .skip(page * limit - limit)
    .limit(limit)

  return consultants.map(consultant => ({
    ...consultant._doc,
    id: consultant.id
  }))
}

const findSingleItem = async ({ id }) => {
  if (!id) throw new Error('Id is required')

  const user = await User.findById(id)

  if (!user) {
    throw notFound()
  }

  return {
    ...user._doc,
    id: user.id
  }
}

module.exports = {
  findAll,
  findSingleItem,
  userExist,
  createUser,
  findUserByEmail
}
