const express = require('express');
const ProjectType = require('../Models/projectType');
const router = express.Router();


router.post('/', async (req, res) => {
    try {
            const { typeName } = req.body;

            const result = new ProjectType({typeName});

            await result.save();

            res.send(result);

    } catch (error) {
        res.send(error);
    }
})

router.get('/', async (req, res) => {

    const result = await ProjectType.findAll({ order:['id']})

    res.send(result);
})

router.get('/:id', async (req, res) => {

    const projecttype = await ProjectType.findOne({where: {id: req.params.id}})
  
    res.send(projecttype);
  })
  
  router.delete('/:id', async(req,res)=>{
      try {
  
          const result = await ProjectType.destroy({
              where: { id: req.params.id },
              force: true,
          });
  
          if (result === 0) {
              return res.status(404).json({
                status: "fail",
                message: "ProjectType with that ID not found",
              });
            }
        
            res.status(204).json();
          }  catch (error) {
          res.send({error: error.message})
      }
      
  })
  
  router.patch('/:id', async(req,res)=>{
      try {
          ProjectType.update(req.body, {
              where: { id: req.params.id }
            })
              .then(num => {
                if (num == 1) {
                  res.send({
                    message: "ProjectType was updated successfully."
                  });
                } else {
                  res.send({
                    message: `Cannot update ProjectType with id=${id}. Maybe ProjectType was not found or req.body is empty!`
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