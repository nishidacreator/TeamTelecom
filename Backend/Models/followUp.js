const { DataTypes } = require('sequelize');
const sequelize = require('../Utils/db');

const BsnlFollowup = sequelize.define('bsnlfollowup',{
    firstName : {type : DataTypes.STRING, allowNull : false},
    lastName : {type : DataTypes.STRING},
    gender : {type : DataTypes.STRING},
    country : {type : DataTypes.STRING},
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
    time: {type: DataTypes.TIME},
    callTime: {type: DataTypes.DATE}
},
{
    freezeTableName: true,
    timestamps : false
})


module.exports = BsnlFollowup;


