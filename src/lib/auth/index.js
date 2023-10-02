const { userExist, createUser, findUserByEmail } = require('../user')
const { badRequest } = require('../../utils/error')
const { generateHash, hashMatched } = require('../../utils/hashing')
const { generateToken } = require('../token')

/**
 * Creates a new user account and returns the user object.
 *
 * @param {object} params - User signup parameters.
 * @throws {Error} If the user already exists or if there's an issue with user creation.
 * @returns {object} The created user object.
 */

const signup = async ({ name, email, phone, birthdate, role, password }) => {
  // Check if a user with the same email already exists
  const hasUser = await userExist(email)

  // If a user with the same email exists, throw an error
  if (hasUser) {
    throw badRequest('User already exist')
  }

  // Generate a hashed password for the new user
  password = await generateHash(password)

  // Create a new user with the provided information
  const user = await createUser({
    name,
    email,
    phone,
    birthdate,
    role,
    password
  })

  // Return the created user object
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
