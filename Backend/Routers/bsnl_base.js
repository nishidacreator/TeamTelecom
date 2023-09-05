const express = require('express');
const Bsnl = require('../Models/bsnl_base');
const router = express.Router();
const excelToJson = require('convert-excel-to-json');
const fs = require('fs-extra');
const multer = require('../Utils/multer');
const Project = require('../Models/project');

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

                const jsonWithoutSheetName = excelData.Sheet1;
                const projectId = req.body.projectId;
                for(let i = 0; i < jsonWithoutSheetName.length; i++){
                  jsonWithoutSheetName[i].projectId = projectId;
                }

                const bsnl = await Bsnl.bulkCreate(jsonWithoutSheetName)

                res.send(bsnl);
            }

    } catch (error) {
        res.send(error);
    }
})

router.get('/', async (req, res) => {
  const status = req.query.status;

    const bsnl = await Bsnl.findAll({ 
      wheere: { status },
      include: [Project, 'teleCaller'],
      order:['id']
    })

    res.send(bsnl);
})

router.get('/:id', async (req, res) => {

  const bsnl = await Bsnl.findOne({
    include: [Project, 'teleCaller'],
    where: {id: req.params.id}
  })

  res.send(bsnl);
})

router.delete('/', async(req,res)=>{
    try {
        const status = req.query.status;
        const result = await Bsnl.destroy({
            where: { status },
            force: true,
        });

        if (result === 0) {
            return res.status(404).json({
              status: "fail",
              message: "Bsnl with that ID not found",
            });
          }
      
          res.status(204).json();
        }  catch (error) {
        res.send({error: error.message})
    }
    
})

router.delete('/alldata', async(req,res)=>{
  try {
    console.log(req.body.status);
      const result = await Bsnl.destroy({
          where: { },
          force: true,
      });

      if (result === 0) {
          return res.status(404).json({
            status: "fail",
            message: "Bsnl with that ID not found",
          });
        }
    
        res.status(204).json();
      }  catch (error) {
      res.send({error: error.message})
  }
  
})

router.patch('/:id', async(req,res)=>{
    try {

        const bsnl = {
          status: req.body.status,
          freeText: req.body.freeText,
          remarks: req.body.remarks,
          action: req.body.action,
          callTime: req.body.callTime
        }
        Bsnl.update(bsnl, {
            where: { id: req.params.id }
          })
            .then(num => {
              if (num == 1) {
                res.send({
                  message: "Bsnl was updated successfully."
                });
              } else {
                res.send({
                  message: `Cannot update Bsnl with id=${id}. Maybe Bsnl was not found or req.body is empty!`
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
      const bsnlfollowup = {
        date: req.body.date,
        time: req.body.time,
        callTime: req.body.callTime,
        status: req.body.status
      }
      Bsnl.update(bsnlfollowup, {
          where: { id: req.params.id }
        })
          .then(num => {
            if (num == 1) {
              res.send({
                message: "BsnlFollowup was updated successfully."
              });
            } else {
              res.send({
                message: `Cannot update BsnlFollowup with id=${id}. Maybe BsnlFollowup was not found or req.body is empty!`
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

router.get('/caller', async (req, res) => {

  const asianet = await Bsnl.findAll({ 
    include: [Project, 'teleCaller'],
    order:['id']
  })

  res.send(asianet);
})
module.exports = router;