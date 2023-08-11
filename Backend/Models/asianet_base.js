const { DataTypes } = require('sequelize');
const sequelize = require('../Utils/db');

const Asianet = sequelize.define('asianet',{
    region : {type : DataTypes.STRING},
    subCode : {type : DataTypes.STRING},
    name : {type : DataTypes.STRING, allowNullValues : false},
    balance : {type : DataTypes.FLOAT, allowNullValues : false},
    mobile : {type : DataTypes.FLOAT, allowNullValues : false},
    
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


module.exports = Asianet;


