const router = require('express').Router()
const { models: { Instrument }} = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const instruments = await Instrument.findAll()
    res.json(instruments)
  } catch (err) {
    next(err)
  }
})
