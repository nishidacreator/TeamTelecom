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

    User.hasMany(Bsnl, {foreignKey: 'teleCallerId'})
    Bsnl.belongsTo(User, {as: 'teleCaller', foreignKey : 'teleCallerId'})

    User.hasMany(Asianet, {foreignKey: 'teleCallerId'})
    Asianet.belongsTo(User, {as: 'teleCaller', foreignKey : 'teleCallerId'})

    User.hasMany(Bajaj, {foreignKey: 'teleCallerId'})
    Bajaj.belongsTo(User, {as: 'teleCaller', foreignKey : 'teleCallerId'})

    User.hasMany(Vi, {foreignKey: 'teleCallerId'})
    Vi.belongsTo(User, {as: 'teleCaller', foreignKey : 'teleCallerId'})

    Project.hasMany(FollowUp, {foreignKey: 'projectId'})
    FollowUp.belongsTo(Project)

    Project.hasMany(AsianetFollowup, {foreignKey: 'projectId'})
    AsianetFollowup.belongsTo(Project)

    Project.hasMany(BajajFollowup, {foreignKey: 'projectId'})
    BajajFollowup.belongsTo(Project)

    Project.hasMany(ViFollowup, {foreignKey: 'projectId'})
    ViFollowup.belongsTo(Project)

    User.hasMany(BsnlFollowup, {foreignKey: 'teleCallerId'})
    BsnlFollowup.belongsTo(User, {as: 'caller', foreignKey : 'teleCallerId'})

    User.hasMany(AsianetFollowup, {foreignKey: 'teleCallerId'})
    AsianetFollowup.belongsTo(User, {as: 'caller', foreignKey : 'teleCallerId'})

    User.hasMany(BajajFollowup, {foreignKey: 'teleCallerId'})
    BajajFollowup.belongsTo(User, {as: 'caller', foreignKey : 'teleCallerId'})

    User.hasMany(ViFollowup, {foreignKey: 'teleCallerId'})
    ViFollowup.belongsTo(User, {as: 'caller', foreignKey : 'teleCallerId'})

    // Bsnl.hasMany(FollowUp, {foreignKey: 'baseId'})
    // FollowUp.belongsTo(Bsnl, {as: 'bsnl_base', foreignKey: 'baseId'})

    // Asianet.hasMany(FollowUp, {foreignKey: 'baseId'})
    // FollowUp.belongsTo(Asianet, {as: 'asianet_base', foreignKey: 'baseId'})

    // Bajaj.hasMany(FollowUp, {foreignKey: 'baseId'})
    // FollowUp.belongsTo(Bajaj, {as: 'bajaj_base', foreignKey: 'baseId'})

    // Vi.hasMany(FollowUp, {foreignKey: 'baseId'})
    // FollowUp.belongsTo(Vi, {as: 'vi_base', foreignKey: 'baseId'})

    await sequelize.sync({alter : true})

    //BULK CREATE
    const role = await Role.findAll({})
    if(role.length === 0){
        Role.bulkCreate([
            {roleName : 'Admin', status: true},
            {roleName : 'Telecaller', status: true}
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
}

module.exports = syncModel