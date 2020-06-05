'use strict'
module.exports = function(sequelize, DataTypes) {
  const StaffCode = sequelize.define(
    'StaffCode',
    {
      id: {
        type: DataTypes.INTEGER(20).UNSIGNED,
        primaryKey: true,
        autoIncrement: true
      },
      codeName: {
        type: DataTypes.STRING(50),
        field: 'code_name'
      },
      s_code: {
        type: DataTypes.INTEGER(20),
        field: 's_code'
      },
      userId: {
        type: DataTypes.INTEGER(20),
        field: 'user_id'
      },
      updateUserId: {
        type: DataTypes.INTEGER(20),
        field: 'update_user_id'
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
      tableName: 'staff_code'
    }
  )

  return StaffCode
}
