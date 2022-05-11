const router = require('express').Router()
const { models: { Brand }} = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const brands = await Brand.findAll()
    res.json(brands)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async(req,res,next) => {
  try{
      const brand = await Brand.findByPk(req.params.id)
      res.send(brand)

  }
  catch(ex) {
    next(ex)
  }
})