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
    general_condition: {
      type: Schema.ObjectId,
      ref: 'GeneralCondition'
    },
    consultant_visit_id: {
      type: Schema.ObjectId,
      ref: 'ConsultantVisit'
    },
    user: {
      type: Schema.ObjectId,
      ref: 'User'
    },
    medicines: [
      {
        type: Schema.ObjectId,
        ref: 'Medicine'
      }
    ],
    labtests: [
      {
        type: Schema.ObjectId,
        ref: 'LabTest'
      }
    ]
  },
  { timestamps: true, id: true }
)

const Prescription = model('Prescription', prescriptionSchema)
module.exports = Prescription
