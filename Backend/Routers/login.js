const express = require('express');
const router = express.Router();
const User = require('../Models/user');
const bcrypt = require('bcrypt');
const jwtTokens = require('../Utils/jsonWebTokens');


router.post('/', async(req, res)=> {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({where: { email: email }});

        if(!user){
                return res.status(404).send({ message: 'User not found' });
            }   
           
        const validPassword = await bcrypt.compare(password, user.password);

        if(!validPassword){
            return res.status(401).send({ message: 'incorrect password' });
        }

        let userToken = {id:user.id, name:user.name, email: user.email, role: user.roleId};
        console.log(userToken);

        let token = jwtTokens(userToken);
        // console.log(token);

        res.cookie('refreshtoken', token.refreshToken, {httpOnly : true})

        return res.status(200).send({"token" : token, "role": user.roleId, "name" : user.name, "id" : user.id});

    } catch (error) {
        res.send(error);
    }    
})

module.exports = router;