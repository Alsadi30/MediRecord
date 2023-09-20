const { Schema, model } = require('mongoose')

const medicineSchema = new Schema(
  {
    medicine_name: {
      type: String,
      maxLength: 50,
      minLength: 2,
      required: true
    },
    dose: {
      type: String,
      maxLength: 50,
      minLength: 2,
      required: true
    },
    duration: {
      type: String,
      maxLength: 20,
      required: true
    },
    prescription: {
      type: Schema.ObjectId,
      ref: 'Prescription'
    }
  },
  { timestamps: true, id: true }
)

const Medicine = model('Medicine', medicineSchema)
module.exports = Medicine
