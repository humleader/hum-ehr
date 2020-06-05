module.exports = class {
  findAndCountAll(params) {
    const { StaffCode } = global.M

    const { where, curPage = 1, pageSize = 20, ...rest } = params

    return StaffCode.findAndCountAll({
      where,
      limit: +pageSize,
      offset: (+curPage - 1) * +pageSize,
      ...rest
    })
  }

  findAll(params) {
    const { StaffCode } = global.M

    return StaffCode.findAll(params)
  }

  create(params, options = {}) {
    const { StaffCode } = global.M

    return StaffCode.create(params, options)
  }

  bulkCreate(params, options = {}) {
    const { StaffCode } = global.M

    return StaffCode.bulkCreate(params, options)
  }

  findOne(params) {
    const { StaffCode } = global.M

    return StaffCode.findOne(params)
  }

  update(params, options = {}) {
    const { StaffCode } = global.M

    return StaffCode.update(params, options)
  }

  destroy(params) {
    const { StaffCode } = global.M

    return StaffCode.destroy(params)
  }
}
