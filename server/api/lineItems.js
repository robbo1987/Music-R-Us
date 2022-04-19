const router = require('express').Router()
const { models: { Lineitem }} = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const lineItems= await Lineitem.findAll()
    res.json(lineItems)
  } catch (err) {
    next(err)
  }
})

