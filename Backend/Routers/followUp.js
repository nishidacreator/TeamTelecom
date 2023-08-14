const express = require('express');
const BsnlFollowup = require('../Models/followUp');
const router = express.Router();
const excelToJson = require('convert-excel-to-json');
const fs = require('fs-extra');
const multer = require('../Utils/multer');
const Project = require('../Models/project');

router.post('/', multer.single('imageUrl'), async (req, res) => {
    try {

          const { firstName, lastName, gender, country, mobile, age, employeeNo, status, remarks, freeText, action, teleCallerId, projectId, date, time } = req.body;

          const result = new BsnlFollowup({firstName, lastName, gender, country, mobile, age, employeeNo, status, remarks, freeText, action, teleCallerId, projectId, date, time});

          await result.save();

          res.send(result);

    } catch (error) {
        res.send(error);
    }
})

router.get('/', async (req, res) => {

    const bsnlfollowup = await BsnlFollowup.findAll({ 
      include: [Project, 'caller'],
      order:['id']
    })

    res.send(bsnlfollowup);
})

router.get('/:id', async (req, res) => {

  const bsnlfollowup = await BsnlFollowup.findOne({
    include: [Project, 'caller'],
    where: {id: req.params.id}
  })

  res.send(bsnlfollowup);
})

router.delete('/:id', async(req,res)=>{
    try {

        const result = await BsnlFollowup.destroy({
            where: { id: req.params.id },
            force: true,
        });

        if (result === 0) {
            return res.status(404).json({
              status: "fail",
              message: "BsnlFollowup with that ID not found",
            });
          }
      
          res.status(204).json();
        }  catch (error) {
        res.send({error: error.message})
    }
    
})

router.patch('/:id', async(req,res)=>{
    try {

        const bsnlfollowup = {
          status: req.body.status,
          freeText: req.body.freeText,
          remarks: req.body.remarks,
          action: req.body.action
        }
        BsnlFollowup.update(bsnlfollowup, {
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

router.patch('/callback/:id', async(req,res)=>{
  try {

    const bsnl = {
      date: req.body.date,
      time: req.body.time
    }
      BsnlFollowup.update(bsnl, {
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

router.delete('/', async(req,res)=>{
  try {
    console.log(req.body.status);
      const result = await BsnlFollowup.destroy({
          where: { status: req.body.status },
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
    const result = await BsnlFollowup.destroy({
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


module.exports = router;