const sequelize = require('./db');
const { JSON } = require('sequelize');
const Role = require('../Models/userRole');
const User = require('../Models/user');
const ProjectType = require('../Models/projectType');
const Project = require('../Models/project');

async function syncModel(){

    Role.hasMany(User,{foreignKey : 'roleId', onDelete : 'CASCADE', onUpdate : 'CASCADE'})
    User.belongsTo(Role)

    ProjectType.hasMany(Project, {foreignKey: 'projectTypeId'})
    Project.belongsTo(ProjectType)

    User.hasMany(Project, {foreignKey: 'teamLeadId'})
    Project.belongsTo(User, {as: 'teamLead', foreignKey : 'teamLeadId'})

    await sequelize.sync({alter : true})


    //BULK CREATE
    const role = await Role.findAll({})
    if(role.length === 0){
        Role.bulkCreate([
            {roleName : 'Admin', status: true},
            {roleName : 'Telecaller', status: true}
        ])
    }
}

module.exports = syncModel