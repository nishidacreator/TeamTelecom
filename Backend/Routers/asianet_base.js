const express = require('express');
const Asianet = require('../Models/asianet_base');
const Project = require('../Models/project');
const router = express.Router();


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

          const asianet = await Asianet.bulkCreate(jsonWithoutSheetName)

          res.send(asianet);
      }

    } catch (error) {
        res.send(error);
    }
})

router.get('/', async (req, res) => {

    const asianet = await Asianet.findAll({ 
      include: [Project, 'teleCaller'],
      order:['id']
    })

    res.send(asianet);
})

router.get('/:id', async (req, res) => {

  const asianet = await Asianet.findOne({
    where: {id: req.params.id},
    include: [Project, 'teleCaller']
  })

  res.send(asianet);
})

router.delete('/:id', async(req,res)=>{
    try {

        const result = await Asianet.destroy({
            where: { id: req.params.id },
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
        action: req.body.action
      }
        Asianet.update(asianet, {
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
      Asianet.update(asianet, {
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