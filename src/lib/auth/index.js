const { userExist, createUser, findUserByEmail } = require('../user')
const { badRequest } = require('../../utils/error')
const { generateHash, hashMatched } = require('../../utils/hashing')
const { generateToken } = require('../token')

const signup = async ({ name, email, phone, birthdate, role, password }) => {
  const hasUser = await userExist(email)
  if (hasUser) {
    throw badRequest('User already exist')
  }

  password = await generateHash(password)
  const user = await createUser({
    name,
    email,
    phone,
    birthdate,
    role,
    password
  })

  return user
}

/**
 * Attempt to log in a user by verifying their credentials.
 *
 * @param {object} params - The login parameters.
 * @param {string} params.email - The user's email.
 * @param {string} params.password - The user's password.
 * @returns {string} Access token if login is successful.
 * @throws {Error} Throws an error if login fails (e.g., invalid credentials).
 */

const login = async ({ email, password }) => {
  // Find the user by their email
  const user = await findUserByEmail(email)

  // If no user is found, throw an error indicating invalid credentials
  if (!user) {
    throw badRequest('Invalid Credentials')
  }

  // Check if the provided password matches the stored hashed password
  const matched = await hashMatched(password, user.password)

  // If the passwords don't match, throw an error indicating invalid credentials
  if (!matched) {
    throw badRequest('Invalid Credentials')
  }

  // Prepare a payload for the access token
  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role
  }

  return generateToken({ payload })
}

module.exports = {
  signup,
  login
}
