const SalaryService = require('services/salary')
const salaryService = new SalaryService()
module.exports = class {
  async findAndCountAll(params) {
    const { where, pageIndex = 1, pageSize = 20, ...rest } = params

    const { count, rows } = await salaryService.findAndCountAll({
      where,
      limit: +pageSize,
      offset: (+pageIndex - 1) * +pageSize,
      ...rest
    })
    return {
      pageIndex: +pageIndex,
      pageSize: +pageSize,
      total: count,
      list: rows || []
    }
  }

  findAll(params) {
    return salaryService.findAll(params)
  }

  findOne(params) {
    return salaryService.findOne(params)
  }

  update(params, options = {}) {
    return salaryService.update(params, options)
  }

  bulkCreate(params, options = {}) {
    return salaryService.bulkCreate(params, options)
  }
}
