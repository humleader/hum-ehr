module.exports = class {
  findAndCountAll(params) {
    const { Employee } = global.M

    const { where, curPage = 1, pageSize = 20, ...rest } = params

    return Employee.findAndCountAll({
      where,
      limit: +pageSize,
      offset: (+curPage - 1) * +pageSize,
      ...rest
    })
  }

  findAll(params) {
    const { Employee } = global.M

    return Employee.findAll(params)
  }

  create(params, options = {}) {
    const { Employee } = global.M

    return Employee.create(params, options)
  }

  bulkCreate(params, options = {}) {
    const { Employee } = global.M

    return Employee.bulkCreate(params, options)
  }

  findOne(params) {
    const { Employee } = global.M

    return Employee.findOne(params)
  }

  update(params, options = {}) {
    const { Employee } = global.M

    return Employee.update(params, options)
  }

  destroy(params) {
    const { Employee } = global.M

    return Employee.destroy(params)
  }
}
