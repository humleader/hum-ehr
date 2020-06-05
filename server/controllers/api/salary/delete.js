const Salary = require('daos/salary')

module.exports = async ctx => {
  const salary = new Salary()

  const params = ctx.request.body

  await salary.update(
    {
      sendStatus: 4
    },
    { where: { id: params.id } }
  )

  ctx.body = {
    code: 0,
    data: ''
  }
}
