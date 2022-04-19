const router = require('express').Router()
const { models: { Lineitem }} = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const lineitems = await Lineitem.findAll()
    res.json(lineitems)
  } catch (err) {
    next(err)
  }
})