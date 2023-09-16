const { Schema, model } = require('mongoose')

const consultantVisitSchema = new Schema(
  {
    consultant_name: {
      type: String,
      maxLength: 50,
      minLength: 3,
      required: true
    },
    consultant: {
      type: Schema.ObjectId,
      ref: 'User'
    },
    visit_no: {
      type: Number,
      maxLength: 4,
      minLength: 1,
      required: true
    },
    date: {
      type: Date,
      required: true
    }
  },
  { timestamps: true, id: true }
)

const ConsultantVisit = model('ConsultantVisit', consultantVisitSchema)
module.exports = ConsultantVisit
