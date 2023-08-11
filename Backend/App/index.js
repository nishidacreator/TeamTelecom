const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors');
const syncModel = require('../Utils/association');
const sequelize = require('../Utils/db');

require('dotenv').config();
const app = express();

app.use(express.json());
app.use(cors({orgin:'*'}))

syncModel()

// 
const Role = require('../Routers/userRole');
app.use('/role', Role);

const Login = require('../Routers/login');
app.use('/login', Login);

const Register = require('../Routers/register');
app.use('/register', Register);

const Project = require('../Routers/project');
app.use('/project', Project);

const ProjectType = require('../Routers/projectType');
app.use('/projectType', ProjectType);

const Client = require('../Routers/client');
app.use('/client', Client);

// PROJECT BASE
const Bsnl = require('../Routers/bsnl_base');
app.use('/bsnl', Bsnl);

const Asianet = require('../Routers/asianet_base');
app.use('/asianet', Asianet);

const Bajaj = require('../Routers/bajaj_base');
app.use('/bajaj', Bajaj);

const Vi = require('../Routers/vi_base');
app.use('/vi', Vi);

const FollowUp = require('../Routers/followUp');
app.use('/followUp', FollowUp);

const AsianetFollow = require('../Routers/asianet_followup');
app.use('/asianetfollowUp', AsianetFollow);

const BajajFollow = require('../Routers/bajaj_followup');
app.use('/bajajfollowUp', BajajFollow);

const ViFollow = require('../Routers/vi_followup');
app.use('/vifollowUp', ViFollow);

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`server started on port ${port}`);
})
