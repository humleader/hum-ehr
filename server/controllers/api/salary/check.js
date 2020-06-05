const Salary = require('daos/salary')
const monthyear = require('utils/email/month-en')

module.exports = async ctx => {
  const salary = new Salary()

  const params = ctx.request.body
  if (params.profile) {
    let profile = JSON.parse(params.profile)

    if (params.preMonth) {
      const curTime = new Date()
      curTime.setMonth(curTime.getMonth() - 1)
      profile.monthyear = monthyear(curTime)
    } else {
      profile.monthyear = monthyear()
    }
    profile = JSON.stringify(profile)
    params.profile = profile
  }

  await salary.update(
    {
      ...params
    },
    { where: { id: params.id } }
  )

  ctx.body = {
    code: 0,
    data: ''
  }
}
