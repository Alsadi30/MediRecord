const { Schema, model } = require('mongoose')

const generalConditionSchema = new Schema(
  {
    sign_symptom: {
      type: String,
      required: true
    },
    body_condition: {
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
    consultant_visit_id: {
      type: Schema.ObjectId,
      ref: 'ConsultantVisit'
    },
    user: {
      type: Schema.ObjectId,
      ref: 'User'
    },
    prescription: {
      type: Schema.ObjectId,
      ref: 'Prescription'
    },
    BP: {
      type: String,
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

const GeneralCondition = model('GeneralCondition', generalConditionSchema)
module.exports = GeneralCondition
