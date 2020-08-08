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
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    salt: {
      type: DataTypes.STRING,
    },
    role_id: {
      type: DataTypes.INTEGER,
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
    tableName: 'admin_users',
    timestamps: true,
    underscored: true,
  });

  adminUser.getAllData = async () => {
    try {
      const sql = `
      SELECT
      au.id,
      au.id AS 'key',
      au.name,
      au.email,
      au.status,
      r.id,
      r.name as role_name
      FROM admin_users au 
      INNER JOIN roles r ON au.role_id = r.id
      `;
      
      let result = await sequelize.query(sql, {
        type: sequelize.QueryTypes.SELECT,
      });
      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(err);
    }
  };


  return adminUser;
};