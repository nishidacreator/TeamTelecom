const express = require('express');
const AsianetSalesFollowup = require('../Models/asianet_sales_followup');
const Project = require('../Models/project');
const router = express.Router();


router.post('/', async (req, res) => {
    try {
      const { Region, Subcode, Name, Address, Package, Scheme, Phone, Balance, Mobile, Teleby, projectId, date, time } = req.body;

      const result = new AsianetSalesFollowup({Region, Subcode, Name, Address, Package, Scheme, Phone, Balance, Mobile, Teleby, projectId, date, time, status: 1});

      await result.save();

      res.send(result);

    } catch (error) {
        res.send(error);
    }
})

router.get('/', async (req, res) => {

  const status = req.query.status;

    const asianet = await AsianetSalesFollowup.findAll({ 
      where: {status},
      include: [Project, 'caller', 'callStatus'],
      order:['id']
    })

    res.send(asianet);
})

router.get('/all', async (req, res) => {

    const asianet = await AsianetSalesFollowup.findAll({ 
      include: [Project, 'caller', 'callStatus'],
      order:['id']
    })

    res.send(asianet);
})

router.get('/:id', async (req, res) => {

  const asianetfollowup = await AsianetSalesFollowup.findOne({
    where: {id: req.params.id},
    include: [Project, 'caller', 'callStatus']
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
      time: req.body.time,
      callTime: req.body.callTime,
      status: req.body.status
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
      const status = req.query.status;
      const result = await AsianetSalesFollowup.destroy({
          where: { status },
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

router.get('/caller', async (req, res) => {

  const asianet = await AsianetSalesFollowup.findAll({ 
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
      AsianetSalesFollowup.update(asianet, {
          where: { id: req.params.id }
        })
          .then(num => {
            if (num == 1) {
              res.send({
                message: "AsianetSalesFollowup was updated successfully."
              });
            } else {
              res.send({
                message: `Cannot update AsianetSalesFollowup with id=${id}. Maybe AsianetSalesFollowup was not found or req.body is empty!`
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
      AsianetSalesFollowup.update(req.body, {
          where: { id: req.params.id }
        })
          .then(num => {
            if (num == 1) {
              res.send({
                message: "AsianetSalesFollowup was updated successfully."
              });
            } else {
              res.send({
                message: `Cannot update AsianetSalesFollowup with id=${id}. Maybe AsianetSalesFollowup was not found or req.body is empty!`
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

      const result = await AsianetSalesFollowup.destroy({
          where: { id: req.params.id },
          force: true,
      });

      if (result === 0) {
          return res.status(404).json({
            status: "fail",
            message: "AsianetSalesFollowup with that ID not found",
          });
        }
    
        res.status(204).json();
      }  catch (error) {
      res.send({error: error.message})
  }
  
})

module.exports = router;