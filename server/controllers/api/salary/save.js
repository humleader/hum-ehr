const Salary = require('daos/salary')
const xlsx = require('node-xlsx')
const fs = require('fs')
const towordpdf = require('utils/email/towordpdf')

module.exports = async ctx => {
  const salary = new Salary()

  const params = []
  let res
  try {
    const workSheetsFromBuffer = xlsx.parse(fs.readFileSync(`${ctx.request.files.file.path}`))
    if (workSheetsFromBuffer.length !== 0) {
      const excelData = workSheetsFromBuffer[0].data
      excelData.map((res, index) => {
        const temp = {}
        if (index !== 0 && res[res.length - 2]) {
          const row = towordpdf(res)
          temp.profile = JSON.stringify(row)
          temp.idNo = row.idNo
          temp.englishName = row.englishName
          temp.chineseName = row.chineseName
          temp.eMail = row.eMail
          temp.basicSalary = row.basicSalary === '-' ? 0 : row.basicSalary
          temp.contact = row.contact
          temp.salaryPeriod = row.salaryPeriod
          temp.accountNo = row.cardNo
          temp.addUserId = ctx.user.id
          temp.sendStatus = 3
          params.push(temp)
        }
      })
      if (params.length) {
        await salary.bulkCreate(params)
        res = {
          code: 0,
          data: ''
        }
      } else {
        res = {
          code: 1,
          error: '上传失败！'
        }
      }
    } else {
      res = {
        code: 1,
        error: '上传失败！'
      }
    }
  } catch (error) {
    res = {
      code: 1,
      error: '上传失败！'
    }
  }
  fs.unlinkSync(ctx.request.files.file.path)

  ctx.body = res
}
