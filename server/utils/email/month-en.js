const monthEn = userTime => {
  let time = new Date()
  if (userTime) {
    time = new Date(userTime)
  }

  const Month = time.getMonth()

  const year = time.getFullYear()

  const list = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'June',
    'July',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec'
  ]
  return list[Month] + '.' + year
}

module.exports = monthEn
