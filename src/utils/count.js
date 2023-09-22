const count = ({ search = '', searchBy = '', Model }) => {
  const filter = {
    [searchBy]: { $regex: search, $options: 'i' }
  }

  return Model.count(filter)
}

module.exports = count
