const generalConditionService = require('../../../../lib/generalConditionService')

const create = async (req, res, next) => {
  const {
    sign_symptom,
    consultant_visit_id,
    BP,
    pulse,
    weight,
    age,
    body_condition
  } = req.body

  try {
    const generalCondition = await generalConditionService.create({
      sign_symptom,
      consultant_visit_id,
      BP,
      pulse,
      weight,
      age,
      body_condition
    })

    const response = {
      code: 201,
      message: 'General Condition Created Successfully',
      data: { ...generalCondition },
      links: {
        self: `/general-condition/${generalCondition.id}`
      }
    }

    res.status(201).json(response)
  } catch (e) {
    next(e)
  }
}

module.exports = create
