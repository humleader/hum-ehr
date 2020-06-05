const Salary = require('daos/salary')
const word = require('utils/email/word')

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

  const pdfBuffer = await word(oneData)
  ctx.set('Content-Type', 'application/pdf')
  ctx.body = Buffer.from(pdfBuffer)
}
