const consultantVisitService = require('../../lib/consultantVisitService')
const ConsultantVisit = require('../../model/consultant-visit')

jest.mock('../../model/consultant-visit')

describe('findAll', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return all consultantVisits of a user', async () => {
    const user = '65089500704fb1fb695bea3f'
    const search = ''
    const searchBy = 'consultant_name'

    const consultantVisitsData = [
      {
        _id: '1',
        consultant_name: 'Consultant 1',
        visit_no: 1,
        date: '2013-4-5',
        user: '65089500704fb1fb695bea3f'
      },
      {
        _id: '2',
        consultant_name: 'Consultant 2',
        visit_no: 1,
        date: '2013-4-5',
        user: '65089500704fb1fb695bea3f'
      }
    ]

    ConsultantVisit.find.mockResolvedValue(consultantVisitsData)

    const result = await consultantVisitService.findAll({
      page: 1,
      limit: 10,
      search,
      searchBy,
      user
    })

    expect(ConsultantVisit.find).toHaveBeenCalledWith({
      [searchBy]: { $regex: search, $options: 'i' },
      user
    })

    expect(result).toEqual(consultantVisitsData)
  })

  it('should return an empty array if no consultantVisits are found', async () => {
    const user = '65089500704fb1fb695bea3f'
    const search = ''
    const searchBy = 'consultant_name'

    ConsultantVisit.find.mockResolvedValue([])

    const result = await consultantVisitService.findAll({
      page: 1,
      limit: 10,
      search,
      searchBy,
      user
    })

    expect(ConsultantVisit.find).toHaveBeenCalledWith({
      [searchBy]: { $regex: search, $options: 'i' },
      user
    })

    expect(result).toEqual([])
  })
})
