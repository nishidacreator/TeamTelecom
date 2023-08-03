const express = require('express');
const Project = require('../Models/project');
const ProjectType = require('../Models/projectType');
const router = express.Router();


router.post('/', async (req, res) => {
    try {
            const { startDate, projectName, imageUrl, teamLeadId, description, clientName, projectTypeId } = req.body;

            const result = new Project({startDate, projectName, imageUrl, teamLeadId, description, clientName, projectTypeId});

            await result.save();

            res.send(result);

    } catch (error) {
        res.send(error);
    }
})

router.get('/', async (req, res) => {

    const result = await Project.findAll({ order:['id'], include: [ProjectType, 'teamLead']})

    res.send(result);
})

// router.get('/:id', async (req, res) => {

//   const role = await Role.findOne({where: {id: req.params.id}})

//   res.send(role);
// })

// router.delete('/:id', async(req,res)=>{
//     try {

//         const result = await Role.destroy({
//             where: { id: req.params.id },
//             force: true,
//         });

//         if (result === 0) {
//             return res.status(404).json({
//               status: "fail",
//               message: "Role with that ID not found",
//             });
//           }
      
//           res.status(204).json();
//         }  catch (error) {
//         res.send({error: error.message})
//     }
    
// })

// router.patch('/:id', async(req,res)=>{
//     try {
//         Role.update(req.body, {
//             where: { id: req.params.id }
//           })
//             .then(num => {
//               if (num == 1) {
//                 res.send({
//                   message: "Role was updated successfully."
//                 });
//               } else {
//                 res.send({
//                   message: `Cannot update Role with id=${id}. Maybe Role was not found or req.body is empty!`
//                 });
//               }
//             })
//       } catch (error) {
//         res.status(500).json({
//           status: "error",
//           message: error.message,
//         });
//       }
// })
module.exports = router;