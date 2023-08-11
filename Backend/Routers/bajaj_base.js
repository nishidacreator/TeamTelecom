const express = require('express');
const Bajaj = require('../Models/bajaj_base');
const Asianet = require('../Models/asianet_base');
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

          const bajaj = await Bajaj.bulkCreate(jsonWithoutSheetName)

          res.send(bajaj);
      }

    } catch (error) {
        res.send(error);
    }
})

router.get('/', async (req, res) => {

    const bajaj = await Bajaj.findAll({ 
      include: [Project, 'teleCaller'],
      order:['id']
    })

    res.send(bajaj);
})

router.get('/:id', async (req, res) => {

  const bajaj = await Bajaj.findOne({where: {id: req.params.id}})

  res.send(bajaj);
})

router.delete('/:id', async(req,res)=>{
    try {

        const result = await Bajaj.destroy({
            where: { id: req.params.id },
            force: true,
        });

        if (result === 0) {
            return res.status(404).json({
              status: "fail",
              message: "Bajaj with that ID not found",
            });
          }
      
          res.status(204).json();
        }  catch (error) {
        res.send({error: error.message})
    }
    
})

router.patch('/:id', async(req,res)=>{
    try {

      const bajaj = {
        status: req.body.status,
        freeText: req.body.freeText,
        remarks: req.body.remarks,
        action: req.body.action
      }

        Bajaj.update(bajaj, {
            where: { id: req.params.id }
          })
            .then(num => {
              if (num == 1) {
                res.send({
                  message: "Bajaj was updated successfully."
                });
              } else {
                res.send({
                  message: `Cannot update Bajaj with id=${id}. Maybe Bajaj was not found or req.body is empty!`
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

router.patch('/followup/:id', async(req,res)=>{
  try {

    const bajaj = {
      date: req.body.date,
      time: req.body.time
    }

      Bajaj.update(bajaj, {
          where: { id: req.params.id }
        })
          .then(num => {
            if (num == 1) {
              res.send({
                message: "Bajaj was updated successfully."
              });
            } else {
              res.send({
                message: `Cannot update Bajaj with id=${id}. Maybe Bajaj was not found or req.body is empty!`
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