const { DataTypes } = require('sequelize');
const sequelize = require('../Utils/db');

const Bsnl = sequelize.define('bsnl',{
    firstName : {type : DataTypes.STRING, allowNull : false},
    lastName : {type : DataTypes.STRING},
    gender : {type : DataTypes.STRING},
    country : {type : DataTypes.FLOAT},
    mobile : {type : DataTypes.STRING, allowNull : false},
    age : {type : DataTypes.FLOAT},
    employeeNo : {type : DataTypes.STRING},
    
    status : {type : DataTypes.STRING},
    remarks : {type : DataTypes.STRING},
    freeText : {type : DataTypes.STRING},
    action : {type : DataTypes.STRING},
    teleCallerId : {type : DataTypes.INTEGER, allowNull: false},
    projectId: {type : DataTypes.INTEGER, allowNull: false},
    date: {type: DataTypes.DATEONLY},
    time: {type: DataTypes.TIME}
},
{
    freezeTableName: true,
    timestamps : false
})


module.exports = Bsnl;

