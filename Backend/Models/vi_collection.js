const { DataTypes } = require('sequelize');
const sequelize = require('../Utils/db');

const ViCollection = sequelize.define('viCollection',{
    Region : {type : DataTypes.STRING},
    Subcode : {type : DataTypes.STRING},
    Name : {type : DataTypes.STRING},
    Address : {type : DataTypes.STRING},
    Package : {type : DataTypes.STRING},
    Scheme : {type : DataTypes.STRING},
    Phone : {type : DataTypes.STRING},
    Balance : {type : DataTypes.FLOAT},
    Mobile : {type : DataTypes.STRING},
    
    status : {type : DataTypes.INTEGER},
    remarks : {type : DataTypes.STRING},
    freeText : {type : DataTypes.STRING},
    action : {type : DataTypes.STRING},
    Teleby : {type : DataTypes.INTEGER, allowNull: false},
    projectId: {type : DataTypes.INTEGER, allowNull: false},
    date: {type: DataTypes.DATEONLY},
    time: {type: DataTypes.TIME},
    callTime: {type: DataTypes.DATE}
},
{
    freezeTableName: true,
    timestamps : false
})


module.exports = ViCollection;


