const express = require('express');
const Client = require('../Models/client');
const router = express.Router();


router.post('/', async (req, res) => {
    try {
            const { clientName, phoneNumber } = req.body;

            const client = new Client({clientName, phoneNumber});

            await client.save();

            res.send(client);

    } catch (error) {
        res.send(error);
    }
})

router.get('/', async (req, res) => {

    const client = await Client.findAll({ order:['id']})

    res.send(client);
})

router.get('/:id', async (req, res) => {

  const client = await Client.findOne({where: {id: req.params.id}})

  res.send(client);
})

router.delete('/:id', async(req,res)=>{
    try {

        const result = await Client.destroy({
            where: { id: req.params.id },
            force: true,
        });

        if (result === 0) {
            return res.status(404).json({
              status: "fail",
              message: "Client with that ID not found",
            });
          }
      
          res.status(204).json();
        }  catch (error) {
        res.send({error: error.message})
    }
    
})

router.patch('/:id', async(req,res)=>{
    try {
        Client.update(req.body, {
            where: { id: req.params.id }
          })
            .then(num => {
              if (num == 1) {
                res.send({
                  message: "Client was updated successfully."
                });
              } else {
                res.send({
                  message: `Cannot update Client with id=${id}. Maybe Client was not found or req.body is empty!`
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