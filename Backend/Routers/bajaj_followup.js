const express = require('express');
const BajajFollowup = require('../Models/bajaj_followup');
const Asianet = require('../Models/asianet_base');
const router = express.Router();
const Project = require('../Models/project');

router.post('/', async (req, res) => {
    try {
      const { subCode, name, balance, mobile, emi, product, status, remarks, freeText, action, Teleby, projectId, date, time } = req.body;

      const result = new BajajFollowup({subCode, name, balance, mobile, emi, product, status, remarks, freeText, action, Teleby, projectId, date, time});

      await result.save();

      res.send(result);

    } catch (error) {
        res.send(error);
    }
})

router.get('/', async (req, res) => {

  const status = req.query.status;

    const result = await BajajFollowup.findAll({ 
      where: {status},
      include: [Project, 'caller'],
      order:['id']
    })

    res.send(result);
})

router.get('/all', async (req, res) => {

    const result = await BajajFollowup.findAll({ 
      include: [Project, 'caller'],
      order:['id']
    })

    res.send(result);
})

router.get('/:id', async (req, res) => {

  const bajajfollowup = await BajajFollowup.findOne({
    where: {id: req.params.id},
    include: [Project, 'caller']
  })

  res.send(bajajfollowup);
})

router.delete('/:id', async(req,res)=>{
    try {

        const result = await BajajFollowup.destroy({
            where: { id: req.params.id },
            force: true,
        });

        if (result === 0) {
            return res.status(404).json({
              status: "fail",
              message: "BajajFollowup with that ID not found",
            });
          }
      
          res.status(204).json();
        }  catch (error) {
        res.send({error: error.message})
    }
    
})

router.patch('/:id', async(req,res)=>{
    try {

      const bajajfollowup = {
        status: req.body.status,
        freeText: req.body.freeText,
        remarks: req.body.remarks,
        action: req.body.action,
        callTime: req.body.callTime
      }

        BajajFollowup.update(bajajfollowup, {
            where: { id: req.params.id }
          })
            .then(num => {
              if (num == 1) {
                res.send({
                  message: "BajajFollowup was updated successfully."
                });
              } else {
                res.send({
                  message: `Cannot update BajajFollowup with id=${id}. Maybe BajajFollowup was not found or req.body is empty!`
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

    const bajaj = {
      date: req.body.date,
      time: req.body.time,
      callTime: req.body.callTime,
      status: req.body.status
    }
      BajajFollowup.update(bajaj, {
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

router.delete('/', async(req,res)=>{
  try {
      const status = req.query.status;

      const result = await BajajFollowup.destroy({
          where: { status },
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

router.delete('/alldata', async(req,res)=>{
try {

    const result = await BajajFollowup.destroy({
        where: { },
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

router.get('/caller', async (req, res) => {

  const asianet = await BajajFollowup.findAll({ 
    include: [Project, 'teleCaller'],
    order:['id']
  })

  res.send(asianet);
})
module.exports = router;