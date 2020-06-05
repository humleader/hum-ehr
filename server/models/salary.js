'use strict'
module.exports = function(sequelize, DataTypes) {
  const Salary = sequelize.define(
    'Salary',
    {
      id: {
        type: DataTypes.INTEGER(20).UNSIGNED,
        primaryKey: true,
        autoIncrement: true
      },
      chineseName: {
        type: DataTypes.STRING(50),
        field: 'chinese_name'
      },
      englishName: {
        type: DataTypes.STRING(50),
        field: 'english_name'
      },
      salaryPeriod: {
        type: DataTypes.STRING(100),
        field: 'salary_period'
      },
      idNo: {
        type: DataTypes.STRING(30),
        field: 'id_no'
      },
      accountNo: {
        type: DataTypes.STRING(100),
        field: 'account_no'
      },
      basicSalary: {
        type: DataTypes.INTEGER(8),
        field: 'basic_salary'
      },
      eMail: {
        type: DataTypes.STRING(50),
        field: 'e_mail'
      },
      profile: {
        type: DataTypes.TEXT,
        field: 'profile'
      },
      sendContent: {
        type: DataTypes.TEXT,
        field: 'send_content'
      },
      contact: {
        type: DataTypes.STRING(100),
        field: 'contact'
      },
      sendStatus: {
        type: DataTypes.INTEGER(10),
        field: 'send_status'
      },
      isLogo: {
        type: DataTypes.INTEGER(10),
        field: 'is_logo'
      },
      isEn: {
        type: DataTypes.INTEGER(10),
        field: 'is_en'
      },
      preMonth: {
        type: DataTypes.INTEGER(10),
        field: 'pre_month'
      },
      checkUserId: {
        type: DataTypes.INTEGER(20),
        field: 'check_user_id'
      },
      sendUserId: {
        type: DataTypes.INTEGER(20),
        field: 'send_user_id'
      },
      addUserId: {
        type: DataTypes.INTEGER(20),
        field: 'add_user_id'
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
      tableName: 'salary'
    }
  )

  return Salary
}
