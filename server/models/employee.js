'use strict'
module.exports = function(sequelize, DataTypes) {
  const Employee = sequelize.define(
    'Employee',
    {
      id: {
        type: DataTypes.INTEGER(20).UNSIGNED,
        primaryKey: true,
        autoIncrement: true
      },
      staffCode: {
        type: DataTypes.STRING(20),
        field: 'staff_code'
      },
      companyId: {
        type: DataTypes.STRING(20),
        field: 'company_id'
      },
      chineseName: {
        type: DataTypes.STRING(50),
        field: 'chinese_name'
      },
      englishName: {
        type: DataTypes.STRING(50),
        field: 'english_name'
      },
      name: {
        type: DataTypes.STRING(20),
        field: 'name'
      },
      birthday: {
        type: DataTypes.STRING(30),
        field: 'birthday'
      },
      gender: {
        type: DataTypes.INTEGER(8),
        field: 'gender'
      },
      political: {
        type: DataTypes.STRING(30),
        field: 'political'
      },
      maritalStatus: {
        type: DataTypes.INTEGER(8),
        field: 'marital_status'
      },
      nationality: {
        type: DataTypes.INTEGER(8),
        field: 'nationality'
      },
      hukouType: {
        type: DataTypes.STRING(30),
        field: 'hukou_type'
      },
      idNo: {
        type: DataTypes.STRING(30),
        field: 'id_no'
      },
      country: {
        type: DataTypes.STRING(200),
        field: 'country'
      },
      passportTime: {
        type: DataTypes.STRING(30),
        field: 'passport_time'
      },
      contact: {
        type: DataTypes.STRING(20),
        field: 'contact'
      },
      Email: {
        type: DataTypes.STRING(50),
        field: 'e_mail'
      },
      emergencyContactName: {
        type: DataTypes.STRING(50),
        field: 'emergency_contact_name'
      },
      emergencyContactTel: {
        type: DataTypes.STRING(20),
        field: 'emergency_contact_tel'
      },
      livingCity: {
        type: DataTypes.STRING(50),
        field: 'living_city'
      },
      residentialCity: {
        type: DataTypes.STRING(50),
        field: 'residential_city'
      },
      livingAddress: {
        type: DataTypes.STRING(100),
        field: 'living_address'
      },
      residentialAddress: {
        type: DataTypes.STRING(500),
        field: 'residential_address'
      },
      accountName: {
        type: DataTypes.STRING(100),
        field: 'account_name'
      },
      accountNo: {
        type: DataTypes.STRING(50),
        field: 'account_no'
      },
      payCity: {
        type: DataTypes.STRING(50),
        field: 'pay_city'
      },
      workStatus: {
        type: DataTypes.INTEGER(8),
        field: 'work_status'
      },
      social: {
        type: DataTypes.INTEGER(8),
        field: 'social'
      },
      basicSalary: {
        type: DataTypes.STRING(20),
        field: 'basic_salary'
      },
      fundStatus: {
        type: DataTypes.INTEGER(8),
        field: 'fund_status'
      },
      fundCompany: {
        type: DataTypes.STRING(100),
        field: 'fund_company'
      },
      fundComNo: {
        type: DataTypes.STRING(20),
        field: 'fund_com_no'
      },
      fundNo: {
        type: DataTypes.STRING(20),
        field: 'fund_no'
      },
      educationInfo: {
        type: DataTypes.TEXT,
        field: 'education_info'
      },
      deductionInfo: {
        type: DataTypes.TEXT,
        field: 'deduction_info'
      },
      addUserId: {
        type: DataTypes.INTEGER(20),
        field: 'add_user_id'
      },
      lastUpdateUserId: {
        type: DataTypes.INTEGER(20),
        field: 'last_update_user_id'
      },
      recycleStatus: {
        type: DataTypes.INTEGER(8),
        field: 'recycle_status'
      },
      createTime: {
        type: DataTypes.DATE,
        field: 'create_time'
      },
      updateTime: {
        type: DataTypes.DATE,
        field: 'update_time'
      }
    },
    {
      tableName: 'employee'
    }
  )

  return Employee
}
