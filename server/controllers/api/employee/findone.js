// 获取用户列表
const Employee = require('daos/employee')

module.exports = async ctx => {
  const employee = new Employee()

  const data = await employee.findEmployee(ctx.query.id)

  const oneData = {
    ...data.dataValues
  }

  ctx.body = {
    code: 0,
    data: oneData
  }
}
