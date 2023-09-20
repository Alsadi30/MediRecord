const { Schema, model } = require('mongoose')

const presentStatusSchema = new Schema(
  {
    body_condition: {
      type: String,
      required: true
    },
    consultant_advice: {
      type: String,
      required: true
    },
    weight: {
      type: Number,
      maxLength: 3,
      minLength: 2,
      required: true
    },
    age: {
      type: Number,
      maxLength: 3,
      minLength: 2,
      required: true
    },
    user: {
      type: Schema.ObjectId,
      ref: 'User'
    },
    bp: {
      type: Number,
      maxLength: 3,
      minLength: 2,
      required: true
    },
    pulse: {
      type: Number,
      maxLength: 3,
      minLength: 2,
      required: true
    }
  },
  { timestamps: true, id: true }
)

const PresentStatus = model('PresentStatus', presentStatusSchema)
module.exports = PresentStatus
