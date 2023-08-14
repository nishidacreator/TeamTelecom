const express = require('express');
const Vi = require('../Models/vi_base');
const router = express.Router();
const Project = require('../Models/project');

router.post('/', async (req, res) => {
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

          const vi = await Vi.bulkCreate(jsonWithoutSheetName)

          res.send(vi);
      }

    } catch (error) {
        res.send(error);
    }
})

router.get('/', async (req, res) => {

    const vi = await Vi.findAll({ 
      include: [Project, 'teleCaller'],
      order:['id']
    })

    res.send(vi);
})

router.get('/:id', async (req, res) => {

  const vi = await Vi.findOne({
    include: [Project, 'teleCaller'],
    where: {id: req.params.id}
  })

  res.send(vi);
})

router.delete('/', async(req,res)=>{
    try {

        const result = await Vi.destroy({
            where: { status: req.body.status },
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
        action: req.body.action
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

router.patch('/callback/:id', async(req,res)=>{
  try {
    const vi = {
      date: req.body.date,
      time: req.body.time
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


module.exports = router;