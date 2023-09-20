const medicineService = require('../../../../lib/medicineService')

const create = async (req, res, next) => {
  const { medicine_name, dose, duration, prescription } = req.body
  console.log(req.body)
  try {
    const medicine = await medicineService.create({
      medicine_name,
      dose,
      duration,
      prescription
    })

    const response = {
      code: 201,
      message: 'Medicine Created Successfully',
      data: { ...medicine },
      links: {
        self: `/medicine/${medicine.id}`
      }
    }

    res.status(201).json(response)
  } catch (e) {
    next(e)
  }
}

module.exports = create
