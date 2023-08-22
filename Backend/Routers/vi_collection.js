const express = require('express');
const ViCollection = require('../Models/vi_collection');
const Project = require('../Models/project');
const router = express.Router();
const multer = require('../Utils/multer');
const excelToJson = require('convert-excel-to-json');
const fs = require('fs-extra');

router.post('/', multer.single('imageUrl'), async (req, res) => {
    try {
      const imageUrl = req.file ? req.file.path : null;

      if(imageUrl != null){
          const filePath = 'uploads/' + req.file.filename;

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

          const jsonWithoutSheetName = excelData.Base;

          const projectId = req.body.projectId;
          for(let i = 0; i < jsonWithoutSheetName.length; i++){
            jsonWithoutSheetName[i].projectId = projectId;
          }

          const vicollection = await ViCollection.bulkCreate(jsonWithoutSheetName)

          res.send(vicollection);
      }

    } catch (error) {
        res.send(error);
    }
})

router.get('/', async (req, res) => {

    const vicollection = await ViCollection.findAll({ 
      include: [Project, 'teleCaller'],
      order:['id']
    })

    res.send(vicollection);
})

router.get('/:id', async (req, res) => {

  const vicollection = await ViCollection.findOne({
    where: {id: req.params.id},
    include: [Project, 'teleCaller']
  })

  res.send(vicollection);
})

router.delete('/', async(req,res)=>{
    try {

        const result = await ViCollection.destroy({
            where: { status: req.body.status },
            force: true,
        });

        if (result === 0) {
            return res.status(404).json({
              status: "fail",
              message: "ViCollection with that ID not found",
            });
          }
      
          res.status(204).json();
        }  catch (error) {
        res.send({error: error.message})
    }
    
})

router.delete('/alldata', async(req,res)=>{
  try {

      const result = await ViCollection.destroy({
          where: { },
          force: true,
      });

      if (result === 0) {
          return res.status(404).json({
            status: "fail",
            message: "ViCollection with that ID not found",
          });
        }
    
        res.status(204).json();
      }  catch (error) {
      res.send({error: error.message})
  }
  
})

router.patch('/:id', async(req,res)=>{
    try {

      const vicollection = {
        status: req.body.status,
        freeText: req.body.freeText,
        remarks: req.body.remarks,
        action: req.body.action,
        callTime: req.body.callTime
      }
        ViCollection.update(vicollection, {
            where: { id: req.params.id }
          })
            .then(num => {
              if (num == 1) {
                res.send({
                  message: "ViCollection was updated successfully."
                });
              } else {
                res.send({
                  message: `Cannot update ViCollection with id=${id}. Maybe ViCollection was not found or req.body is empty!`
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

router.patch('/callback/:id', async(req,res)=>{
  try {

    const vicollection = {
      date: req.body.date,
      time: req.body.time
    }
      ViCollection.update(vicollection, {
          where: { id: req.params.id }
        })
          .then(num => {
            if (num == 1) {
              res.send({
                message: "ViCollection was updated successfully."
              });
            } else {
              res.send({
                message: `Cannot update ViCollection with id=${id}. Maybe ViCollection was not found or req.body is empty!`
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