const authService = require('../../../../lib/auth')
const { generateToken } = require('../../../../lib/token')

/**
 * Handle user signup.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {function} next - Express next middleware function.
 * @returns {void}
 */

const signup = async (req, res, next) => {
  // Extract user information from the request body
  const { name, email, password, phone, birthdate, role } = req.body

  try {
    // Attempt to create a new user account using authService.signup
    const user = await authService.signup({
      name,
      email,
      phone,
      birthdate,
      password,
      role
    })

    // Generate an access token for the new user
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    }
    const accessToken = generateToken({ payload })

    // Prepare a successful response
    const response = {
      code: 201,
      message: 'Signup Successful',
      data: {
        access_token: accessToken
      },
      links: {
        self: req.url,
        login: '/auth/login'
      }
    }
    // Send a 201 Created response with the access token
    res.status(201).json(response)
  } catch (err) {
    next(err)
  }
}

module.exports = signup
