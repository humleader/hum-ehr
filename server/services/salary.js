module.exports = class {
  findAndCountAll(params) {
    const { Salary } = global.M

    const { where, curPage = 1, pageSize = 20, ...rest } = params

    return Salary.findAndCountAll({
      where,
      limit: +pageSize,
      offset: (+curPage - 1) * +pageSize,
      ...rest
    })
  }

  findAll(params) {
    const { Salary } = global.M

    return Salary.findAll(params)
  }

  create(params, options = {}) {
    const { Salary } = global.M

    return Salary.create(params, options)
  }

  bulkCreate(params, options = {}) {
    const { Salary } = global.M

    return Salary.bulkCreate(params, options)
  }

  findOne(params) {
    const { Salary } = global.M

    return Salary.findOne(params)
  }

  update(params, options = {}) {
    const { Salary } = global.M

    return Salary.update(params, options)
  }

  destroy(params) {
    const { Salary } = global.M

    return Salary.destroy(params)
  }
}
