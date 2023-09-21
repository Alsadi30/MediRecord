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
    comment: {
      type: String,
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
