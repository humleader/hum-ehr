const Salary = require('daos/salary')

module.exports = async ctx => {
  const salary = new Salary()

  const data = await salary.findOne({
    where: {
      id: ctx.query.id
    }
  })

  const oneData = {
    ...data.dataValues
  }

  ctx.body = {
    code: 0,
    data: oneData
  }
}
