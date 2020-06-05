'use strict'
module.exports = function(sequelize, DataTypes) {
  const OperationLog = sequelize.define(
    'OperationLog',
    {
      id: {
        type: DataTypes.INTEGER(20).UNSIGNED,
        primaryKey: true,
        autoIncrement: true
      },
      comment: {
        type: DataTypes.TEXT,
        field: 'comment'
      },
      companyId: {
        type: DataTypes.INTEGER(20),
        field: 'company_id'
      },
      candidateId: {
        type: DataTypes.INTEGER(20),
        field: 'candidate_id'
      },
      proId: {
        type: DataTypes.INTEGER(20),
        field: 'pro_id'
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
      tableName: 'operation_log'
    }
  )

  return OperationLog
}
