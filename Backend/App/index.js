const express = require('express')
// const dotenv = require('dotenv')
const cors = require('cors');

const syncModel = require('../Utils/association');

const sequelize = require('../Utils/db');
require('dotenv').config();

//middleware
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
// 

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`server started on port ${port}`);
})
