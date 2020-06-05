module.exports = class {
  async getEmployeeList(query, filter) {
    const { Employee } = global.M
    const { pageIndex, pageSize } = query
    const offset = (pageIndex - 1) * pageSize
    const limit = +pageSize
    return Employee.findAndCountAll({
      where: {
        ...filter
      },
      limit,
      offset,
      order: [['updateTime', 'DESC']]
    })
  }

  async SaveEmployee(ctx) {
    const params = ctx.request.body
    const { Employee, sequelize, StaffCode } = global.M
    return sequelize
      .transaction(async t => {
        if (params.id) {
          await Employee.update(
            {
              ...params,
              lastUpdateUserId: ctx.user.id
            },
            { where: { id: params.id }, transaction: t }
          )
        } else {
          await Employee.create(
            {
              ...params,
              addUserId: ctx.user.id
            },
            {
              transaction: t
            }
          )
          await StaffCode.update(
            {
              sCode: params.sCode + 1
            },
            { where: { id: params.staffCodeid }, transaction: t }
          )
        }
      })
      .then(res => res)
      .catch(res => {
        console.log(res)
      })
  }

  async filterEmployee(idNo) {
    const { Employee } = global.M
    return Employee.findAll({
      where: {
        idNo
      }
    })
  }

  async findEmployee(id) {
    const { Employee } = global.M
    return Employee.findOne({
      where: {
        id: id
      }
    })
  }
}
