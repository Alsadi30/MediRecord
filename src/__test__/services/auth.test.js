// const { signup } = require('../../api/v1/auth/controller')
// const authService = require('../../lib/auth')
// const { userExist } = require('../../lib/user')

// const req = {
//   body: {
//     name: 'sadi',
//     email: 'sadi@gmail.com',
//     password: 'password',
//     phone: '380948590',
//     birthdate: '2015-08-08',
//     role: 'patient'
//   }
// }
// const res = {
//   status: jest.fn(x => x),
//   send: jest.fn(x => x)
// }
// const next = jest.fn(x => x)
// const body = req.body

// jest.mock('../../lib/auth', () => {
//   signup: jest.fn(({ body }) => body)
// })

// jest.mock('../../lib/user', () => {
//   userExist: jest.fn(() => false)
// })

// it('should send a status code of 400 when user exists', async () => {
//   await signup(req, res, next)

//   // expect(authService.signup).toHaveBeenCalledWith({
//   //   name: 'sadi',
//   //   email: 'adimn@gmail.com',
//   //   phone: '34908590348945',
//   //   birthdate: '2015-09-09',
//   //   role: 'patient',
//   //   password: 'password'
//   // })
//   expect(userExist).toHaveBeenCalledWith(req.body.email)
// })

const signupService = require('../../lib/auth')
const { badRequest } = require('../../utils/error')
const User = require('../../model/user')

jest.mock('../../model/user')

describe('signupService', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should throw an error if user already exists', async () => {
    User.findOne.mockResolvedValue({ email: 'johndoe@example.com' })

    const userData = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'password'
    }

    await expect(signupService.signup(userData)).rejects.toThrowError(
      'User already exists'
    )

    expect(User.findOne).toHaveBeenCalledWith({ email: userData.email })

    expect(User.create).not.toHaveBeenCalled()
  })

  it('should create a new user if user does not exist', async () => {
    User.findOne.mockResolvedValue(null)
    const userData = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'password',
      phone: '437869587',
      birthdate: '2026-09-09',
      role: 'patient'
    }

    const createdUser = {
      id: 'someUserId',
      ...userData
    }
    User.create.mockResolvedValue(createdUser)

    const result = await signupService.signup(userData)

    expect(User.findOne).toHaveBeenCalledWith({ email: userData.email })

    // expect(User.create).toHaveBeenCalledWith(createdUser)

    expect(result).toEqual(createdUser)
  })
})
