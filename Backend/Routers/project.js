const express = require('express');
const Project = require('../Models/project');
const ProjectType = require('../Models/projectType');
const router = express.Router();
const Client = require('../Models/client');
const excelToJson = require('convert-excel-to-json');
const fs = require('fs-extra');
const multer = require('../Utils/multer')

router.post('/', multer.single('imageUrl'), async (req, res) => {
    try {
        const { startDate, projectName, teamLeadId, description, clientId, projectTypeId, endDate} = req.body;
        console.log(req.file)
        const imageUrl = req.file ? req.file.path : null;
        console.log(`Image URL: ${imageUrl}`)
        console.log(req.body)

        const result = new Project({startDate, projectName, imageUrl, teamLeadId, description, clientId, projectTypeId, endDate});

        // const result = Project.create(req.body)
        await result.save();

        if(imageUrl != null){
            const filePath = 'uploads/' + req.file.filename;
            console.log(filePath)

            const excelData = excelToJson({
                sourceFile: filePath,
                header: {
                    rows: 1
                },
                columnToKey: {
                    "*": "{{columnHeader}}"
                }
            });
        
            fs.remove(filePath);
            // res.status(200).json(excelData);
        }
    
        
        res.send(result);
        
    }      
       
    catch (error) {
            res.send(error);
    }

})

router.get('/', async (req, res) => {

    const result = await Project.findAll({ order:['id'], include: [ProjectType, 'teamLead', Client]})

    res.send(result);
})

router.get('/:id', async (req, res) => {

  const result = await Project.findOne({where: {id: req.params.id}})

  res.send(result);
})

router.delete('/:id', async(req,res)=>{
    try {

        const result = await Project.destroy({
            where: { id: req.params.id },
            force: true,
        });

        if (result === 0) {
            return res.status(404).json({
              status: "fail",
              message: "Project with that ID not found",
            });
          }
      
          res.status(204).json();
        }  catch (error) {
        res.send({error: error.message})
    }
    
})

router.patch('/:id', async(req,res)=>{
    try {

        Project.update(req.body, {
            where: { id: req.params.id }
          })
            .then(num => {
              if (num == 1) {
                res.send({
                  message: "Project was updated successfully."
                });
              } else {
                res.send({
                  message: `Cannot update Project with id=${id}. Maybe Project was not found or req.body is empty!`
                });
              }
            })
      } catch (error) {
        res.status(500).json({
          status: "error",
          message: error.message,
        });
      }
})
module.exports = router;