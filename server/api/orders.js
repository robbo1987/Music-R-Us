const router = require("express").Router();
const {
  models: { User, Order },
} = require("../db");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    const orders = await Order.findAll({
      where: {
        userId: user.id,
      },
    });
    res.json(orders);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const order = await Order.create();
    res.json(order);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    const order = await Order.findOne({
      where: {
        id: req.params.id,
        userId: user.id,
      },
    });
    await order.update({ isCart: false });
    await Order.create({ userId: user.id, isCart: true });
    res.json(
      await Order.findAll({
        where: {
          userId: user.id,
        },
      })
    );
  } catch (err) {
    next(err);
  }
});
