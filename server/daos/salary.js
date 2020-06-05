const SalaryService = require('services/salary')
const salaryService = new SalaryService()
module.exports = class {
  findAndCountAll(params) {
    const { where, pageIndex = 1, pageSize = 20, ...rest } = params

    return salaryService.findAndCountAll({
      where,
      limit: +pageSize,
      offset: (+pageIndex - 1) * +pageSize,
      ...rest
    })
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
