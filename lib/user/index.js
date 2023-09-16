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

module.exports = {
  userExist,
  createUser,
  findUserByEmail
}
