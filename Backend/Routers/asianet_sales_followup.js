const express = require('express');
const AsianetSalesFollowup = require('../Models/asianet_sales_followup');
const Project = require('../Models/project');
const router = express.Router();


router.post('/', async (req, res) => {
    try {
      const { region, subCode, name, balance, mobile, status, remarks, freeText, action, teleCallerId, projectId, date, time } = req.body;

      const result = new AsianetSalesFollowup({region, subCode, name, balance, mobile, status, remarks, freeText, action, teleCallerId, projectId, date, time});

      await result.save();

      res.send(result);

    } catch (error) {
        res.send(error);
    }
})

router.get('/', async (req, res) => {

    const asianetfollowup = await AsianetSalesFollowup.findAll({ 
      include: [Project, 'caller'],
      order:['id']
    })

    res.send(asianetfollowup);
})

router.get('/:id', async (req, res) => {

  const asianetfollowup = await AsianetSalesFollowup.findOne({
    where: {id: req.params.id},
    include: [Project, 'caller']
  })

  res.send(asianetfollowup);
})

router.delete('/:id', async(req,res)=>{
    try {

        const result = await AsianetSalesFollowup.destroy({
            where: { id: req.params.id },
            force: true,
        });

        if (result === 0) {
            return res.status(404).json({
              status: "fail",
              message: "AsianetFollowup with that ID not found",
            });
          }
      
          res.status(204).json();
        }  catch (error) {
        res.send({error: error.message})
    }
    
})

router.patch('/:id', async(req,res)=>{
    try {

      const asianetfollowup = {
        status: req.body.status,
        freeText: req.body.freeText,
        remarks: req.body.remarks,
        action: req.body.action,
        callTime: req.body.callTime
      }
        AsianetSalesFollowup.update(asianetfollowup, {
            where: { id: req.params.id }
          })
            .then(num => {
              if (num == 1) {
                res.send({
                  message: "AsianetFollowup was updated successfully."
                });
              } else {
                res.send({
                  message: `Cannot update AsianetFollowup with id=${id}. Maybe AsianetFollowup was not found or req.body is empty!`
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
      AsianetSalesFollowup.update(asianet, {
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

router.delete('/', async(req,res)=>{
  try {

      const result = await AsianetSalesFollowup.destroy({
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

    const result = await AsianetSalesFollowup.destroy({
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
module.exports = router;