const express = require('express');
const Vi = require('../Models/vi_base');
const router = express.Router();
const Project = require('../Models/project');
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
            jsonWithoutSheetName[i].status = 1
          }


          const vi = await Vi.bulkCreate(jsonWithoutSheetName)

          res.send(vi);
      }

    } catch (error) {
        res.send(error);
    }
})

router.get('/', async (req, res) => {

  const status = req.query.status;

    const vi = await Vi.findAll({ 
      where: { status },
      include: [Project, 'teleCaller', 'callStatus'],
      order:['id']
    })

    res.send(vi);
})

router.get('/all', async (req, res) => {
    const vi = await Vi.findAll({ 
      include: [Project, 'teleCaller', 'callStatus'],
      order:['id']
    })

    res.send(vi);
})

router.get('/:id', async (req, res) => {

  const vi = await Vi.findOne({
    include: [Project, 'teleCaller',  'callStatus'],
    where: {id: req.params.id}
  })

  res.send(vi);
})

router.delete('/', async(req,res)=>{
    try {
        const status = req.query.status;

        const result = await Vi.destroy({
            where: { status },
            force: true,
        });

        if (result === 0) {
            return res.status(404).json({
              status: "fail",
              message: "Vi with that ID not found",
            });
          }
      
          res.status(204).json();
        }  catch (error) {
        res.send({error: error.message})
    }
    
})

router.delete('/alldata', async(req,res)=>{
  try {

      const result = await Vi.destroy({
          where: {  },
          force: true,
      });

      if (result === 0) {
          return res.status(404).json({
            status: "fail",
            message: "Vi with that ID not found",
          });
        }
    
        res.status(204).json();
      }  catch (error) {
      res.send({error: error.message})
  }
  
})


router.patch('/:id', async(req,res)=>{
    try {
      const vi = {
        status: req.body.status,
        freeText: req.body.freeText,
        remarks: req.body.remarks,
        action: req.body.action,
        callTime: req.body.callTime
      }
      console.log(vi)

      const result =  Vi.update(vi, {
            where: { id: req.params.id }
          })
            .then(num => {
              if (num == 1) {
                res.send({message : "Vi updated successfully"});
              } else {
                res.send({
                  message: `Cannot update Vi with id=${id}. Maybe Vi was not found or req.body is empty!`
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
    const vi = {
      date: req.body.date,
      time: req.body.time,
      callTime: req.body.callTime,
      status: req.body.status
    }

      Vi.update(vi, {
          where: { id: req.params.id }
        })
          .then(num => {
            if (num == 1) {
              res.send({
                message: "Vi was updated successfully."
              });
            } else {
              res.send({
                message: `Cannot update Vi with id=${id}. Maybe Vi was not found or req.body is empty!`
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

  const asianet = await Vi.findAll({ 
    include: [Project, 'teleCaller', 'callStatus'],
    order:['id']
  })

  res.send(asianet);
})

router.patch('/bulkupdate/:id', async (req, res) => {
  try {
    const asianet = {
      Teleby: req.body.Teleby,
    }
      Vi.update(asianet, {
          where: { id: req.params.id }
        })
          .then(num => {
            if (num == 1) {
              res.send({
                message: "Vi was updated successfully."
              });
            } else {
              res.send({
                message: `Cannot update Vi with id=${id}. Maybe Vi was not found or req.body is empty!`
              });
            }
          })
    } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.patch('/update/:id', async(req,res)=>{
  try {
      Vi.update(req.body, {
          where: { id: req.params.id }
        })
          .then(num => {
            if (num == 1) {
              res.send({
                message: "Vi was updated successfully."
              });
            } else {
              res.send({
                message: `Cannot update Vi with id=${id}. Maybe Vi was not found or req.body is empty!`
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

router.delete('/:id', async(req,res)=>{
  try {

      const result = await Vi.destroy({
          where: { id: req.params.id },
          force: true,
      });

      if (result === 0) {
          return res.status(404).json({
            status: "fail",
            message: "Vi with that ID not found",
          });
        }
    
        res.status(204).json();
      }  catch (error) {
      res.send({error: error.message})
  }
  
})

module.exports = router;