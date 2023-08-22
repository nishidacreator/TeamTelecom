const sequelize = require('./db');
const { JSON } = require('sequelize');
const Role = require('../Models/userRole');
const User = require('../Models/user');
const ProjectType = require('../Models/projectType');
const Project = require('../Models/project');
const Client = require('../Models/client');
const Bsnl = require('../Models/bsnl_base');
const Asianet = require('../Models/asianet_base');
const Bajaj = require('../Models/bajaj_base');
const Vi = require('../Models/vi_base');
const FollowUp = require('../Models/followUp');
const BsnlFollowup = require('../Models/followUp');
const AsianetFollowup = require('../Models/asianet_followup');
const BajajFollowup = require('../Models/bajaj_followup');
const ViFollowup = require('../Models/vi_followup');
const bcrypt = require('bcrypt');

async function syncModel(){

    Role.hasMany(User,{foreignKey : 'roleId', onDelete : 'CASCADE', onUpdate : 'CASCADE'})
    User.belongsTo(Role)

    ProjectType.hasMany(Project, {foreignKey: 'projectTypeId'})
    Project.belongsTo(ProjectType)

    User.hasMany(Project, {foreignKey: 'teamLeadId'})
    Project.belongsTo(User, {as: 'teamLead', foreignKey : 'teamLeadId'})

    Client.hasMany(Project, {foreignKey: 'clientId'})
    Project.belongsTo(Client)

    Project.hasMany(Bsnl, {foreignKey: 'projectId'})
    Bsnl.belongsTo(Project)

    Project.hasMany(Asianet, {foreignKey: 'projectId'})
    Asianet.belongsTo(Project)

    Project.hasMany(Bajaj, {foreignKey: 'projectId'})
    Bajaj.belongsTo(Project)

    Project.hasMany(Vi, {foreignKey: 'projectId'})
    Vi.belongsTo(Project)

    User.hasMany(Bsnl, {foreignKey: 'Teleby'})
    Bsnl.belongsTo(User, {as: 'teleCaller', foreignKey : 'Teleby'})

    User.hasMany(Asianet, {foreignKey: 'Teleby'})
    Asianet.belongsTo(User, {as: 'teleCaller', foreignKey : 'Teleby'})

    User.hasMany(Bajaj, {foreignKey: 'Teleby'})
    Bajaj.belongsTo(User, {as: 'teleCaller', foreignKey : 'Teleby'})

    User.hasMany(Vi, {foreignKey: 'Teleby'})
    Vi.belongsTo(User, {as: 'teleCaller', foreignKey : 'Teleby'})

    Project.hasMany(FollowUp, {foreignKey: 'projectId'})
    FollowUp.belongsTo(Project)

    Project.hasMany(AsianetFollowup, {foreignKey: 'projectId'})
    AsianetFollowup.belongsTo(Project)

    Project.hasMany(BajajFollowup, {foreignKey: 'projectId'})
    BajajFollowup.belongsTo(Project)

    Project.hasMany(ViFollowup, {foreignKey: 'projectId'})
    ViFollowup.belongsTo(Project)

    User.hasMany(BsnlFollowup, {foreignKey: 'Teleby'})
    BsnlFollowup.belongsTo(User, {as: 'caller', foreignKey : 'Teleby'})

    User.hasMany(AsianetFollowup, {foreignKey: 'Teleby'})
    AsianetFollowup.belongsTo(User, {as: 'caller', foreignKey : 'Teleby'})

    User.hasMany(BajajFollowup, {foreignKey: 'Teleby'})
    BajajFollowup.belongsTo(User, {as: 'caller', foreignKey : 'Teleby'})

    User.hasMany(ViFollowup, {foreignKey: 'Teleby'})
    ViFollowup.belongsTo(User, {as: 'caller', foreignKey : 'Teleby'})


    await sequelize.sync({alter : true})

    //BULK CREATE
    const role = await Role.findAll({})
    if(role.length === 0){
        Role.bulkCreate([
            {roleName : 'Admin', status: true},
            {roleName : 'Telecaller', status: true}
        ])
    }

    const pass = await bcrypt.hash('Admin', 10);

    const user = await User.findAll({})
    if(user.length === 0){
        User.bulkCreate([
            {name: 'Admin',password:pass,roleId:1}
        ])
    }

    const projectType = await ProjectType.findAll({})
    if(projectType.length === 0){
        ProjectType.bulkCreate([
            {typeName: 'Sales'},
            {typeName: 'Support'},
            {typeName: 'Collection'},
        ])
    }

    const project = await Project.findAll({})
    if(project.length === 0){
        Project.bulkCreate([
            {projectName: 'AsianetSales', projectTypeId: 1},
            {projectName: 'ViSales', projectTypeId: 1},
            {projectName: 'AsianetCollections', projectTypeId: 3},
            {projectName: 'ViCollections', projectTypeId: 3},
            {projectName: 'Bajaj', projectTypeId: 2},
            {projectName: 'Bsnl', projectTypeId: 2}
        ])
    }
}

module.exports = syncModel