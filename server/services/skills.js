module.exports = class {
  findAndCountAll(params) {
    const { Skills } = global.M

    const { where, curPage = 1, pageSize = 20, ...rest } = params

    return Skills.findAndCountAll({
      where,
      limit: +pageSize,
      offset: (+curPage - 1) * +pageSize,
      ...rest
    })
  }

  findAll(params) {
    const { Skills } = global.M

    return Skills.findAll(params)
  }

  create(params, options = {}) {
    const { Skills } = global.M

    return Skills.create(params, options)
  }

  bulkCreate(params, options = {}) {
    const { Skills } = global.M

    return Skills.bulkCreate(params, options)
  }

  findOne(params) {
    const { Skills } = global.M

    return Skills.findOne(params)
  }

  update(params, options = {}) {
    const { Skills } = global.M

    return Skills.update(params, options)
  }

  destroy(params) {
    const { Skills } = global.M

    return Skills.destroy(params)
  }
}
