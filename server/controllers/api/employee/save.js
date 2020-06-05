const Employee = require('daos/employee')

module.exports = async ctx => {
  const employee = new Employee()

  const { id, idNo } = ctx.request.body
  let filter
  if (!id) {
    filter = await employee.filterEmployee(idNo)
  }
  if (!(filter && filter.length)) {
    await employee.SaveEmployee(ctx)
    ctx.body = {
      code: 0,
      data: ''
    }
  } else {
    ctx.body = {
      code: 1,
      error: '用户已存在'
    }
  }
}
