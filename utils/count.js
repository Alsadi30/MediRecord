const {
  User,
  ConsultantVisit,
  GeneralCondition,
  LabTest,
  Prescription,
  Medicine,
  PresentStatus
} = require('../model')

const count = ({ search = '', searchBy = '', Model }) => {
  const filter = {
    [searchBy]: { $regex: search, $options: 'i' }
  }

  return Model.count(filter)
}

module.exports = count
