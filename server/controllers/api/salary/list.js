const Salary = require('daos/salary')
const { Op } = require('sequelize')

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

const getStart = time => {
  const curTime = new Date(time)
  const year = curTime.getFullYear()
  const month = curTime.getMonth() + 1
  return new Date(`${year}-${month}-01 00:00:00`)
}
const getEnd = time => {
  const curTime = new Date(time)
  const year = curTime.getFullYear()
  const month = curTime.getMonth() + 1
  const lastDay = getCurrentMonthLast(curTime)
  return new Date(`${year}-${month}-${lastDay} 24:00:00`)
}

module.exports = async ctx => {
  const salary = new Salary()
  const filter = {}
  const { createTime, sendStatus, name } = ctx.query

  if (sendStatus && sendStatus !== '-1') {
    filter.sendStatus = sendStatus
  } else {
    filter.sendStatus = {
      [Op.ne]: 5
    }
  }
  if (name) {
    filter[Op.or] = [
      {
        chineseName: {
          [Op.like]: `%${name}%`
        }
      },
      {
        englishName: {
          [Op.like]: `%${name}%`
        }
      }
    ]
  }

  if (createTime) {
    const start = getStart(createTime[0])
    const end = getEnd(createTime[1])

    filter.createTime = {
      [Op.lt]: end,
      [Op.gt]: start
    }
  }

  const data = await salary.findAndCountAll({
    where: {
      ...filter
    },
    ...ctx.query,
    order: [
      ['sendStatus', 'DESC'],
      ['updateTime', 'DESC']
    ]
  })

  ctx.body = {
    code: 0,
    data: data
  }
}
