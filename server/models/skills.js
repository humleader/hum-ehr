'use strict'
module.exports = function(sequelize, DataTypes) {
  const Skills = sequelize.define(
    'Skills',
    {
      id: {
        type: DataTypes.INTEGER(20).UNSIGNED,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING(50),
        field: 'name'
      },
      displayName: {
        type: DataTypes.STRING(50),
        field: 'display_name'
      },
      parentId: {
        type: DataTypes.INTEGER(20),
        field: 'parent_id'
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
      tableName: 'skills'
    }
  )

  return Skills
}
