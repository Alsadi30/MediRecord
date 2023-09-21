const labTestService = require('../../../../lib/labTestService')

const create = async (req, res, next) => {
  const {
    test_name,
    test_result,
    normal_result,
    consultant_visit_id,
    prescription,
    comment,
    date,
    test_type
  } = req.body
  const user = req.user.id

  try {
    const labTest = await labTestService.create({
      test_name,
      test_result,
      normal_result,
      consultant_visit_id,
      prescription,
      comment,
      date,
      test_type,
      user
    })

    const response = {
      code: 201,
      message: 'Lab Test Created Successfully',
      data: { ...labTest },
      links: {
        self: `/lab-test/${labTest.id}`
      }
    }

    res.status(201).json(response)
  } catch (e) {
    next(e)
  }
}

module.exports = create
