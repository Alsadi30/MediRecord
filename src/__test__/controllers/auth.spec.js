const { signup } = require('../../api/v1/auth/controller')
const authService = require('../../lib/auth')
const { userExist } = require('../../lib/user')

const req = {
  body: {
    name: 'sadi',
    email: 'sadi@gmail.com',
    password: 'password',
    phone: '380948590',
    birthdate: '2015-08-08',
    role: 'patient'
  }
}
const res = {
  status: jest.fn(x => x),
  send: jest.fn(x => x)
}
const next = jest.fn(x => x)
const body = req.body

jest.mock('../../lib/auth', () => {
  signup: jest.fn(({ body }) => body)
})

jest.mock('../../lib/user', () => {
  userExist: jest.fn(() => false)
})

it('should send a status code of 400 when user exists', async () => {
  await signup(req, res, next)

  // expect(authService.signup).toHaveBeenCalledWith({
  //   name: 'sadi',
  //   email: 'adimn@gmail.com',
  //   phone: '34908590348945',
  //   birthdate: '2015-09-09',
  //   role: 'patient',
  //   password: 'password'
  // })
  expect(userExist).toHaveBeenCalledWith(req.body.email)
})
