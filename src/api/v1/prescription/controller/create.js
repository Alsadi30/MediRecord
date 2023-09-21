const prescriptionService = require('../../../../lib/prescriptionService')

const create = async (req, res, next) => {
  const {
    diagnosis,
    advice,
    nextdate,
    consultant_visit_id,
    general_condition
  } = req.body

  try {
    const prescription = await prescriptionService.create({
      diagnosis,
      advice,
      nextdate,
      consultant_visit_id,
      general_condition,
      user: req.user.id
    })

    const response = {
      code: 201,
      message: 'Prescription Created Successfully',
      data: { ...prescription },
      links: {
        self: `/prescription/${prescription.id}`
      }
    }

    res.status(201).json(response)
  } catch (e) {
    next(e)
  }
}

module.exports = create
