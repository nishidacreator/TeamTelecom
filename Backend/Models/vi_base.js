const { DataTypes } = require('sequelize');
const sequelize = require('../Utils/db');

const Vi = sequelize.define('vi',{
    mobileNumber : {type : DataTypes.STRING, allowNull : false},
    custName : {type : DataTypes.STRING, allowNull : false},
    campionName : {type : DataTypes.STRING},
    currentPlan : {type : DataTypes.STRING, allowNull : false},
    noOfConnections : {type : DataTypes.INTEGER},
    pinCode : {type : DataTypes.STRING, allowNull : false},
    suggestedPlan : {type : DataTypes.STRING, allowNull : false},
    
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


module.exports = Vi;


