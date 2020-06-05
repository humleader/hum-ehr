const StaffCode = require('daos/staffcode')
module.exports = async ctx => {
  const staffcode = new StaffCode()

  ctx.body = {
    code: 0,
    data: await staffcode.findAll()
  }
}
