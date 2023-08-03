const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../Utils/db')

const User = sequelize.define('user', {
  // Model attributes are defined here
  name: {type: DataTypes.STRING, allowNull : false},
  phoneNumber: {type: DataTypes.STRING, allowNull : false},
  email: {type: DataTypes.STRING, allowNull : false},
  password: {type: DataTypes.STRING, allowNull : false},
  roleId: {type: DataTypes.INTEGER, allowNull : false},
  status: {type: DataTypes.BOOLEAN, defaultValue : true},
  employeeNo: {type: DataTypes.STRING, allowNull :false}
},
{
  freezeTableName: true
});

module.exports = User