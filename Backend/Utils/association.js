const sequelize = require('./db');
const { JSON } = require('sequelize');
const bcrypt = require('bcrypt');

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
const AsianetSalesFollowup = require('../Models/asianet_sales_followup');
const ViCollectionFollowup = require('../Models/vi_collection_followup');
const ViCollection = require('../Models/vi_collection');
const AsianetSales = require('../Models/asianet_sales_base');

async function syncModel(){
    
    // await sequelize.sync({alter : true})

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

    Project.hasMany(AsianetSales, {foreignKey: 'projectId'})
    AsianetSales.belongsTo(Project)

    Project.hasMany(Bajaj, {foreignKey: 'projectId'})
    Bajaj.belongsTo(Project)

    Project.hasMany(Vi, {foreignKey: 'projectId'})
    Vi.belongsTo(Project)

    Project.hasMany(ViCollection, {foreignKey: 'projectId'})
    ViCollection.belongsTo(Project)

    User.hasMany(Bsnl, {foreignKey: 'Teleby'})
    Bsnl.belongsTo(User, {as: 'teleCaller', foreignKey : 'Teleby'})

    User.hasMany(Asianet, {foreignKey: 'Teleby'})
    Asianet.belongsTo(User, {as: 'teleCaller', foreignKey : 'Teleby'})

    User.hasMany(AsianetSales, {foreignKey: 'Teleby'})
    AsianetSales.belongsTo(User, {as: 'teleCaller', foreignKey : 'Teleby'})

    User.hasMany(Bajaj, {foreignKey: 'Teleby'})
    Bajaj.belongsTo(User, {as: 'teleCaller', foreignKey : 'Teleby'})

    User.hasMany(Vi, {foreignKey: 'Teleby'})
    Vi.belongsTo(User, {as: 'teleCaller', foreignKey : 'Teleby'})

    User.hasMany(ViCollection, {foreignKey: 'Teleby'})
    ViCollection.belongsTo(User, {as: 'teleCaller', foreignKey : 'Teleby'})

    Project.hasMany(FollowUp, {foreignKey: 'projectId'})
    FollowUp.belongsTo(Project)

    Project.hasMany(AsianetFollowup, {foreignKey: 'projectId'})
    AsianetFollowup.belongsTo(Project)

    Project.hasMany(AsianetSalesFollowup, {foreignKey: 'projectId'})
    AsianetSalesFollowup.belongsTo(Project)

    Project.hasMany(BajajFollowup, {foreignKey: 'projectId'})
    BajajFollowup.belongsTo(Project)

    Project.hasMany(ViFollowup, {foreignKey: 'projectId'})
    ViFollowup.belongsTo(Project)

    Project.hasMany(ViCollectionFollowup, {foreignKey: 'projectId'})
    ViCollectionFollowup.belongsTo(Project)

    User.hasMany(BsnlFollowup, {foreignKey: 'Teleby'})
    BsnlFollowup.belongsTo(User, {as: 'caller', foreignKey : 'Teleby'})

    User.hasMany(AsianetFollowup, {foreignKey: 'Teleby'})
    AsianetFollowup.belongsTo(User, {as: 'caller', foreignKey : 'Teleby'})

    User.hasMany(AsianetSalesFollowup, {foreignKey: 'Teleby'})
    AsianetSalesFollowup.belongsTo(User, {as: 'caller', foreignKey : 'Teleby'})

    User.hasMany(BajajFollowup, {foreignKey: 'Teleby'})
    BajajFollowup.belongsTo(User, {as: 'caller', foreignKey : 'Teleby'})

    User.hasMany(ViFollowup, {foreignKey: 'Teleby'})
    ViFollowup.belongsTo(User, {as: 'caller', foreignKey : 'Teleby'})

    User.hasMany(ViCollectionFollowup, {foreignKey: 'Teleby'})
    ViCollectionFollowup.belongsTo(User, {as: 'caller', foreignKey : 'Teleby'})

    await sequelize.sync({alter : true})

    //BULK CREATE
    const role = await Role.findAll({})
    if(role.length === 0){
        Role.bulkCreate([
            {roleName : 'Admin', status: true},
            {roleName : 'Telecaller', status: true}
        ])
    }

    const user = await User.findAll({})
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('123456', salt)
    if(user.length === 0){
        User.bulkCreate([
            {name: "komu", phoneNumber: "2222222222", password: hashedPassword, roleId: 1, employeeNo: 'Komu1'}
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