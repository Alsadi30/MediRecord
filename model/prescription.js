const { Schema, model } = require('mongoose')

const prescriptionSchema = new Schema(
  {
    diagnosis: {
      type: String,
      maxLength: 50,
      minLength: 5,
      required: true
    },
    advice: {
      type: String,
      maxLength: 500,
      minLength: 5,
      required: true
    },
    nextdate: {
      type: Date,
      required: true
    },
    consultant: {
      type: Schema.ObjectId,
      ref: 'User'
    }
  },
  { timestamps: true, id: true }
)

const Prescription = model('Prescription', prescriptionSchema)
module.exports = Prescription
