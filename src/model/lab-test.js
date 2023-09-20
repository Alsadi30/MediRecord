const { Schema, model } = require('mongoose')

const lab_testSchema = new Schema(
  {
    test_name: {
      type: String,
      maxLength: 50,
      minLength: 2,
      required: true
    },
    test_result: {
      type: String,
      maxLength: 500,
      minLength: 4,
      required: true
    },
    normal_result: {
      type: String,
      maxLength: 500,
      minLength: 4,
      required: true
    },
    consultant: {
      type: Schema.ObjectId,
      ref: 'User'
    },
    comment: {
      type: String,
      unique: true,
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    test_type: {
      type: String,
      enum: ['routine', 'typical'],
      default: 'typical'
    }
  },
  { timestamps: true, id: true }
)

const LabTest = model('LabTest', lab_testSchema)
module.exports = LabTest
