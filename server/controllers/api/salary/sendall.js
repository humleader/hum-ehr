const Salary = require('daos/salary')
const emailReport = require('utils/email/email-report')
const transporter = require('utils/email/nodemailer')
const redisStore = require('utils/redis-store')
const attachment = require('utils/email/attachment')
const env = process.env.NODE_ENV || 'development'

module.exports = async ctx => {
  const salary = new Salary()
  const userId = ctx.session.user && ctx.session.user.id
  const EmailSend = await redisStore.get('KOA_HUM:EmailSend')
  let allSalary
  let needEmail
  if (!EmailSend) {
    await redisStore.set('KOA_HUM:EmailSend', true)
    allSalary = await salary.findAll({
      where: {
        sendStatus: 1
      }
    })
    if (!allSalary) {
      ctx.body = {
        code: 1,
        error: '获取需要发送的邮件错误！'
      }
      await redisStore.destroy('KOA_HUM:EmailSend')
      return
    }
    needEmail = allSalary.length
    if (allSalary.length === 0) {
      ctx.body = {
        code: 1,
        error: '没有需要发送的薪资单！'
      }
      await redisStore.destroy('KOA_HUM:EmailSend')
      return
    }
  } else {
    ctx.body = {
      code: 1,
      error: '薪资单在拼命发送中，请稍后再操作！'
    }
    return
  }
  ctx.body = {
    code: 0,
    data: ''
  }

  const successEmail = []
  const errorEmail = []

  const sendMultipleFun = async todo => {
    const shiftDataset = todo.shift()
    let data
    const attachments = []
    if (shiftDataset) {
      const item = shiftDataset
      let item2 = null
      const { profile, html, pdfBuffer } = await attachment(item)
      data = profile

      const findIndex = todo.findIndex(res => item.idNo === res.idNo)
      if (findIndex !== -1) {
        needEmail = needEmail - 1
        const bonus = todo.splice(findIndex, 1)
        item2 = bonus[0]
        const bonusObj = await attachment(item2)
        if (item.basicSalary) {
          attachments.push({
            filename: `${data.englishName}'s payslip of ${data.monthyear}.pdf`,
            content: Buffer.from(pdfBuffer)
          })
          attachments.push({
            filename: `${bonusObj.profile.englishName}'s Bonus.pdf`,
            content: Buffer.from(bonusObj.pdfBuffer)
          })
        } else {
          attachments.push({
            filename: `${bonusObj.profile.englishName}'s payslip of ${bonusObj.profile.monthyear}.pdf`,
            content: Buffer.from(bonusObj.pdfBuffer)
          })
          attachments.push({
            filename: `${data.englishName}'s Bonus.pdf`,
            content: Buffer.from(pdfBuffer)
          })
        }
      } else {
        attachments.push({
          filename: `${data.englishName}'s payslip of ${data.monthyear}.pdf`,
          content: Buffer.from(pdfBuffer)
        })
      }

      const mailOptions = {
        from: '"HR" <hr@humleader.com>', // sender address
        to: env === 'development' ? 'lisang881021@sina.com,admin@humleader.com' : data.eMail,
        subject: `Payslip of ${data.monthyear}`, // Subject line
        html: html, // html body
        attachments: attachments
      }
      const sendFun = () => {
        return new Promise((resolve, reject) => {
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.log(`${data.englishName}`, data.eMail)
              errorEmail.push({
                englishName: data.englishName,
                eMail: data.eMail
              })
              resolve({ code: 1 })
              return
            }
            console.log('Message sent: %s', info.messageId)
            successEmail.push({
              englishName: data.englishName,
              eMail: data.eMail
            })
            resolve({ code: 0 })
          })
        })
      }

      const sendcode = await sendFun()

      if (sendcode.code === 0) {
        item.sendUserId = userId
        item.sendStatus = 2
        if (item2) {
          item2.sendUserId = userId
          item2.sendStatus = 2
          await salary.update(
            {
              ...item2.dataValues
            },
            { where: { id: item2.dataValues.id } }
          )
        }
      } else {
        item.sendUserId = userId
        item.sendStatus = 0
        if (item2) {
          item2.sendUserId = userId
          item2.sendStatus = 0
          await salary.update(
            {
              ...item2.dataValues
            },
            { where: { id: item2.dataValues.id } }
          )
        }
      }
      await salary.update(
        {
          ...item.dataValues
        },
        { where: { id: item.dataValues.id } }
      )
      sendMultipleFun(todo)
    } else {
      await redisStore.destroy('KOA_HUM:EmailSend')
      const htmlstr = emailReport({
        needEmail,
        errorEmail,
        successEmail
      })

      const mailOp = {
        from: '"HR" <hr@humleader.com>', // sender address
        to: `${ctx.user.name},jurry.jiang@humleader.com,lisang881021@sina.com`, // list of receivers
        subject: `Email Report`, // Subject line
        html: htmlstr // html body
      }
      transporter.sendMail(mailOp, (error, info) => {
        if (error) {
          console.log(error)
          return
        }
        console.log('Message sent: %s', info.messageId)
      })
    }
  }
  sendMultipleFun(allSalary)
}
