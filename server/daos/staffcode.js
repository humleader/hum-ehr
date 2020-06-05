const StaffCodeService = require('services/staffcode')
const staffCodeService = new StaffCodeService()
module.exports = class {
  findAll() {
    return staffCodeService.findAll()
  }
}
