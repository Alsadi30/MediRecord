const authService = require('../../../../lib/auth')
const { generateToken } = require('../../../../lib/token')

const signup = async (req, res, next) => {
  const { name, email, password, phone, birthdate, role } = req.body

  try {
    const user = await authService.signup({
      name,
      email,
      phone,
      birthdate,
      password,
      role
    })

    // generate access token
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    }
    const accessToken = generateToken({ payload })

    // response
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

    res.status(201).json(response)
  } catch (err) {
    next(err)
  }
}

module.exports = signup
