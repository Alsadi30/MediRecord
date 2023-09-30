const authService = require('../../../../lib/auth')

/**
 * Handle user login.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {function} next - Express next middleware function.
 * @returns {void}
 */

const login = async (req, res, next) => {
  // Extract email and password from the request body
  const { email, password } = req.body
  try {
    // Attempt to log in using authService.login
    const accessToken = await authService.login({ email, password })

    // Prepare a successful response
    const response = {
      code: 200,
      message: 'Login successful',
      data: {
        access_token: accessToken
      },
      links: {
        self: req.url
      }
    }

    // Send a 200 OK response with the access token
    res.status(200).json(response)
  } catch (err) {
    next(err)
  }
}

module.exports = login
