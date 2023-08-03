const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../Utils/db')

const Project = sequelize.define('project', {
  startDate: {type: DataTypes.DATEONLY, allowNull: false, defaultValue: Date.now()},
  projectName: {type: DataTypes.STRING, allowNull: false},
  imageUrl: {type: DataTypes.STRING},
  teamLeadId: {type: DataTypes.INTEGER},
  description: {type: DataTypes.STRING, allowNull: false},
  clientName: {type: DataTypes.STRING, allowNull: false},
  projectTypeId: {type: DataTypes.INTEGER, allowNull: false},
},
{
  freezeTableName: true
});

module.exports = Project