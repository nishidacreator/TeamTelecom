const express = require('express');
const ViFollowup = require('../Models/vi_followup');
const router = express.Router();
const Project = require('../Models/project');

router.post('/', async (req, res) => {
    try {  
      
          const { mobileNumber, custName, campionName, currentPlan, noOfConnections, pinCode, suggestedPlan, status, remarks, freeText, action, teleCallerId, projectId, date, time } = req.body;

          const result = new ViFollowup({mobileNumber, custName, campionName, currentPlan, noOfConnections, pinCode, suggestedPlan, status, remarks, freeText, action, teleCallerId, projectId, date, time});

          await result.save();

          res.send(result);

        } catch (error) {
            res.send(error);
        }
})

router.get('/', async (req, res) => {

    const vifollowup = await ViFollowup.findAll({ 
      include: [Project, 'caller'],
      order:['id']
    })

    res.send(vifollowup);
})

router.get('/:id', async (req, res) => {

  const vifollowup = await ViFollowup.findOne({
    include: [Project, 'caller'],
    where: {id: req.params.id}
  })

  res.send(vifollowup);
})

router.delete('/:id', async(req,res)=>{
    try {

        const result = await ViFollowup.destroy({
            where: { id: req.params.id },
            force: true,
        });

        if (result === 0) {
            return res.status(404).json({
              status: "fail",
              message: "ViFollowup with that ID not found",
            });
          }
      
          res.status(204).json();
        }  catch (error) {
        res.send({error: error.message})
    }
    
})

router.patch('/:id', async(req,res)=>{
    try {
      const vifollowup = {
        status: req.body.status,
        freeText: req.body.freeText,
        remarks: req.body.remarks,
        action: req.body.action
      }

        ViFollowup.update(vifollowup, {
            where: { id: req.params.id }
          })
            .then(num => {
              if (num == 1) {
                res.send({
                  message: "ViFollowup was updated successfully."
                });
              } else {
                res.send({
                  message: `Cannot update ViFollowup with id=${id}. Maybe ViFollowup was not found or req.body is empty!`
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
      ViFollowup.update(vi, {
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