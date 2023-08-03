const express = require('express');
const ProjectType = require('../Models/projectType');
const router = express.Router();


router.post('/', async (req, res) => {
    try {
            const { typeName } = req.body;

            const result = new ProjectType({typeName});

            await result.save();

            res.send(result);

    } catch (error) {
        res.send(error);
    }
})

router.get('/', async (req, res) => {

    const result = await ProjectType.findAll({ order:['id']})

    res.send(result);
})

module.exports = router;