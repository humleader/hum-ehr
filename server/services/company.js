module.exports = class {
  findAndCountAll(params) {
    const { Company } = global.M

    const { where, curPage = 1, pageSize = 20, ...rest } = params

    return Company.findAndCountAll({
      where,
      limit: +pageSize,
      offset: (+curPage - 1) * +pageSize,
      ...rest
    })
  }

  findAll(params) {
    const { Company } = global.M

    return Company.findAll(params)
  }

  create(params, options = {}) {
    const { Company } = global.M

    return Company.create(params, options)
  }

  bulkCreate(params, options = {}) {
    const { Company } = global.M

    return Company.bulkCreate(params, options)
  }

  findOne(params) {
    const { Company } = global.M

    return Company.findOne(params)
  }

  update(params, options = {}) {
    const { Company } = global.M

    return Company.update(params, options)
  }

  destroy(params) {
    const { Company } = global.M

    return Company.destroy(params)
  }
}
