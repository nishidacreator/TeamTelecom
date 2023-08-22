const express = require('express');
const AsianetSales = require('../Models/asianet_sales_base');
const Project = require('../Models/project');
const router = express.Router();
const multer = require('../Utils/multer');
const excelToJson = require('convert-excel-to-json');
const fs = require('fs-extra');

router.post('/', multer.single('imageUrl'), async (req, res) => {
    try {
      const imageUrl = req.file ? req.file.path : null;
      console.log(imageUrl);
      
      if(imageUrl != null){
          const filePath = 'uploads/' + req.file.filename;
          console.log(filePath);
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

          const asianet = await AsianetSales.bulkCreate(jsonWithoutSheetName)

          res.send(asianet);
      }

    } catch (error) {
        res.send(error);
    }
})

router.get('/', async (req, res) => {

    const asianet = await AsianetSales.findAll({ 
      include: [Project, 'teleCaller'],
      order:['id']
    })

    res.send(asianet);
})

router.get('/:id', async (req, res) => {

  const asianet = await AsianetSales.findOne({
    where: {id: req.params.id},
    include: [Project, 'teleCaller']
  })

  res.send(asianet);
})

router.delete('/', async(req,res)=>{
    try {

        const result = await AsianetSales.destroy({
            where: { status: req.body.status },
            force: true,
        });

        if (result === 0) {
            return res.status(404).json({
              status: "fail",
              message: "Asianet with that ID not found",
            });
          }
      
          res.status(204).json();
        }  catch (error) {
        res.send({error: error.message})
    }
    
})

router.delete('/alldata', async(req,res)=>{
  try {

      const result = await AsianetSales.destroy({
          where: { },
          force: true,
      });

      if (result === 0) {
          return res.status(404).json({
            status: "fail",
            message: "Asianet with that ID not found",
          });
        }
    
        res.status(204).json();
      }  catch (error) {
      res.send({error: error.message})
  }
  
})

router.patch('/:id', async(req,res)=>{
    try {

      const asianet = {
        status: req.body.status,
        freeText: req.body.freeText,
        remarks: req.body.remarks,
        action: req.body.action,
        callTime: req.body.callTime
      }
        AsianetSales.update(asianet, {
            where: { id: req.params.id }
          })
            .then(num => {
              if (num == 1) {
                res.send({
                  message: "Asianet was updated successfully."
                });
              } else {
                res.send({
                  message: `Cannot update Asianet with id=${id}. Maybe Asianet was not found or req.body is empty!`
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

    const asianet = {
      date: req.body.date,
      time: req.body.time
    }
      AsianetSales.update(asianet, {
          where: { id: req.params.id }
        })
          .then(num => {
            if (num == 1) {
              res.send({
                message: "Asianet was updated successfully."
              });
            } else {
              res.send({
                message: `Cannot update Asianet with id=${id}. Maybe Asianet was not found or req.body is empty!`
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