const Salary = require('daos/salary')
const word = require('utils/email/word')
const emailContext = require('utils/email/email')
const emailContextCn = require('utils/email/email-cn')
const transporter = require('utils/email/nodemailer')
const env = process.env.NODE_ENV || 'development'

module.exports = async ctx => {
  const salary = new Salary()

  const item = ctx.request.body

  const data = JSON.parse(item.profile)

  let html = emailContext(data)

  if (item.isEn) {
    html = emailContextCn(data)
  }

  const pdfBuffer = await word(item)

  const mailOptions = {
    from: '"HR" <hr@humleader.com>', // sender address
    to: env === 'development' ? 'admin@humleader.com' : data.eMail, // list of receivers
    subject: `Payslip of ${data.monthyear}`, // Subject line
    html: html, // html body
    attachments: [
      {
        filename: `${data.englishName}'s payslip of ${data.monthyear}.pdf`,
        content: Buffer.from(pdfBuffer)
      }
    ]
  }
  function sendFun() {
    return new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(`${data.englishName}`, data.eMail)
          resolve({ code: 1 })
          return
        }
        console.log('Message sent: %s', info.messageId)
        resolve({ code: 0 })
      })
    })
  }

  const sendcode = await sendFun()

  if (sendcode.code === 0) {
    item.sendUserId = ctx.session.user && ctx.session.user.id
    item.sendStatus = 2
    await salary.update(
      {
        ...item
      },
      { where: { id: item.id } }
    )
    ctx.body = {
      code: 0,
      data: ''
    }
  } else {
    item.sendUserId = ctx.session.user && ctx.session.user.id
    item.sendStatus = 4
    await salary.update(
      {
        ...item
      },
      { where: { id: item.id } }
    )
    ctx.body = {
      code: 1,
      error: '发送失败！'
    }
  }
}
