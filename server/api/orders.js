const router = require('express').Router()
const { models: { User, Order}} = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization)
    const orders = await Order.findAll({
      where:{
        userId: user.id
      }
    })
    res.json(orders)
  } catch (err) {
    next(err)
  }
})