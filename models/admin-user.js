'use strict';
module.exports = (sequelize, DataTypes) => {
  const adminUser = sequelize.define('adminUser', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    created_at: {
      type: DataTypes.DATE,
    },
    updated_at: {
      type: DataTypes.DATE,
    },
    deleted_at: {
      type: DataTypes.DATE,
    },
  }, {
    tableName: 'admin_users',
    timestamps: false,
    underscored: true,
  });

  return adminUser;
};