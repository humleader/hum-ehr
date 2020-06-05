const Employee = require('daos/employee')

module.exports = async ctx => {
  const employee = new Employee()
  const filter = {}
  const { name, staffCode, payCity, workStatus, updateTime, addUserId } = ctx.query

  if (name) {
    filter.$or = [
      {
        name: {
          like: `%${name}%`
        }
      },
      {
        chineseName: {
          like: `%${name}%`
        }
      },
      {
        englishName: {
          like: `%${name}%`
        }
      }
    ]
  }
  if (workStatus && workStatus !== '-1') {
    filter.workStatus = workStatus
  }
  if (staffCode) {
    filter.staffCode = {
      like: `%${staffCode}%`
    }
  }

  if (payCity) {
    filter.payCity = {
      like: `%${payCity}%`
    }
  }

  if (addUserId) {
    filter.addUserId = addUserId
  }
  if (updateTime) {
    const start = new Date(`${updateTime[0]} 00:00:00`)
    const end = new Date(`${updateTime[1]} 24:00:00`)

    filter.updateTime = {
      lt: end,
      gt: start
    }
  }

  if (addUserId) {
    filter.addUserId = addUserId
  }
  if (updateTime) {
    const start = new Date(`${updateTime[0]} 00:00:00`)
    const end = new Date(`${updateTime[1]} 24:00:00`)

    filter.updateTime = {
      lt: end,
      gt: start
    }
  }

  const data = await employee.getEmployeeList(ctx.query, filter)

  ctx.body = {
    code: 0,
    data: data
  }
}
