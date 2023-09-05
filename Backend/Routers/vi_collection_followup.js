const express = require('express');
const ViCollectionFollowup = require('../Models/vi_collection_followup');
const Project = require('../Models/project');
const router = express.Router();


router.post('/', async (req, res) => {
    try {
      const { Region, Subcode, Name, Address, Package, Scheme, Phone, Balance, Mobile, Teleby, projectId, date, time } = req.body;

      const result = new ViCollectionFollowup({Region, Subcode, Name, Address, Package, Scheme, Phone, Balance, Mobile, Teleby, projectId, date, time});

      await result.save();

      res.send(result);

    } catch (error) {
        res.send(error);
    }
})

router.get('/', async (req, res) => {

  const status = req.query.status;

    const result = await ViCollectionFollowup.findAll({ 
      where: {status},
      include: [Project, 'caller'],
      order:['id']
    })

    res.send(result);
})

router.get('/all', async (req, res) => {

    const result = await ViCollectionFollowup.findAll({ 
      include: [Project, 'caller'],
      order:['id']
    })

    res.send(result);
})


router.get('/:id', async (req, res) => {

  const vicollectionfollowup = await ViCollectionFollowup.findOne({
    where: {id: req.params.id},
    include: [Project, 'caller']
  })

  res.send(vicollectionfollowup);
})

router.delete('/:id', async(req,res)=>{
    try {

        const result = await ViCollectionFollowup.destroy({
            where: { id: req.params.id },
            force: true,
        });

        if (result === 0) {
            return res.status(404).json({
              status: "fail",
              message: "ViCollectionFollowup with that ID not found",
            });
          }
      
          res.status(204).json();
        }  catch (error) {
        res.send({error: error.message})
    }
    
})

router.patch('/:id', async(req,res)=>{
    try {

      const vicollectionfollowup = {
        status: req.body.status,
        freeText: req.body.freeText,
        remarks: req.body.remarks,
        action: req.body.action,
        callTime: req.body.callTime
      }
        ViCollectionFollowup.update(vicollectionfollowup, {
            where: { id: req.params.id }
          })
            .then(num => {
              if (num == 1) {
                res.send({
                  message: "ViCollectionFollowup was updated successfully."
                });
              } else {
                res.send({
                  message: `Cannot update ViCollectionFollowup with id=${id}. Maybe ViCollectionFollowup was not found or req.body is empty!`
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

    const vicollection = {
      date: req.body.date,
      time: req.body.time,
      callTime: req.body.callTime,
      status: req.body.status
    }
      ViCollectionFollowup.update(vicollection, {
          where: { id: req.params.id }
        })
          .then(num => {
            if (num == 1) {
              res.send({
                message: "ViCollection was updated successfully."
              });
            } else {
              res.send({
                message: `Cannot update ViCollection with id=${id}. Maybe ViCollection was not found or req.body is empty!`
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
      const result = await ViCollectionFollowup.destroy({
          where: { status },
          force: true,
      });

      if (result === 0) {
          return res.status(404).json({
            status: "fail",
            message: "ViCollection with that ID not found",
          });
        }
    
        res.status(204).json();
      }  catch (error) {
      res.send({error: error.message})
  }
  
})

router.delete('/alldata', async(req,res)=>{
try {

    const result = await ViCollectionFollowup.destroy({
        where: { },
        force: true,
    });

    if (result === 0) {
        return res.status(404).json({
          status: "fail",
          message: "ViCollection with that ID not found",
        });
      }
  
      res.status(204).json();
    }  catch (error) {
    res.send({error: error.message})
}

})

router.get('/caller', async (req, res) => {

  const asianet = await ViCollectionFollowup.findAll({ 
    include: [Project, 'teleCaller'],
    order:['id']
  })

  res.send(asianet);
})
module.exports = router;