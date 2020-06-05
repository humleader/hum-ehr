const Salary = require('daos/salary')

const getCurrentMonthLast = time => {
  let date = new Date()
  if (time) {
    date = new Date(time)
  }
  let currentMonth = date.getMonth()
  const nextMonth = ++currentMonth
  const nextMonthFirstDay = new Date(date.getFullYear(), nextMonth, 1)
  nextMonthFirstDay.setDate(nextMonthFirstDay.getDate() - 1)
  return nextMonthFirstDay.getDate()
}

module.exports = async ctx => {
  const salary = new Salary()
  const filter = {}
  const { createTime, sendStatus, name } = ctx.query

  if (sendStatus && sendStatus !== '-1') {
    filter.sendStatus = sendStatus
  } else {
    filter.sendStatus = {
      ne: 4
    }
  }
  if (name) {
    filter.$or = [
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

  if (createTime) {
    const curTime = new Date(createTime)
    const year = curTime.getFullYear()
    const month = curTime.getMonth() + 1
    const lastDay = getCurrentMonthLast(curTime)
    const start = new Date(`${year}-${month}-01 00:00:00`)
    const end = new Date(`${year}-${month}-${lastDay} 24:00:00`)

    filter.createTime = {
      lt: end,
      gt: start
    }
  }

  const data = await salary.findAndCountAll({
    where: {
      ...filter
    },
    ...ctx.query,
    order: [['updateTime', 'DESC']]
  })

  ctx.body = {
    code: 0,
    data: data
  }
}
