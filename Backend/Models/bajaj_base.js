const { DataTypes } = require('sequelize');
const sequelize = require('../Utils/db');

const Bajaj = sequelize.define('bajaj',{
    subCode : {type : DataTypes.STRING},
    name : {type : DataTypes.STRING, allowNull : false},
    balance : {type : DataTypes.FLOAT, allowNull : false},
    mobile : {type : DataTypes.STRING, allowNull : false},
    emi : {type : DataTypes.STRING, allowNull : false},
    product : {type : DataTypes.STRING, allowNull : false},
    
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


module.exports = Bajaj;


