'use strict';
module.exports = (sequelize, DataTypes) => {
  const role = sequelize.define('role', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    permission: {
      type: DataTypes.JSON,
    },
    status: {
      type: DataTypes.INTEGER,
    },
    created_at: {
      type: DataTypes.DATE,
    },
    updated_at: {
      type: DataTypes.DATE,
    },
  }, {
    tableName: 'roles',
    timestamps: true,
    underscored: true,
  });

  return adminUser;
};