const { Schema, model } = require('mongoose')

const userSchema = new Schema(
  {
    name: {
      type: String,
      maxLength: 50,
      minLength: 5,
      required: true
    },
    email: {
      type: String,
      unique: true,
      required: true
    },
    phone: {
      type: Number,
      maxLength: 15,
      minLength: 9,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    birthdate: {
      type: Date,
      required: true
    },
    role: {
      type: String,
      enum: ['user', 'consultant'],
      default: 'user'
    }
  },
  { timestamps: true, id: true }
)

const User = model('User', userSchema)
module.exports = User
