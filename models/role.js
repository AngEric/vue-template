'use strict';
const { Op } = require('sequelize');

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
    permissions: {
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

  role.getAllData = async () => {
    try {
      let result = await sequelize.models.role.findAll({attributes: ['id', 'name', 'permissions', 'status']});
      result = result.map((a) => {
        a = a.get({plain: true});
        a.key = a.id;
        return a;
      });

      for (let i = 0; i < result.length; i++) {
        const permissions = await sequelize.models.permission.findAll({
          where: {
            id: {
              [Op.in]: result[i].permissions,
            },
          },
        });
        result[i].active_permissions = permissions;
      }
      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(err);
    }
  };

  return role;
};