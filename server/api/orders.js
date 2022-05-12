const router = require("express").Router();
const {
  models: { User, Order, Lineitem, Instrument },
} = require("../db");
module.exports = router;

const isAdmin = async (req, res, next) => {
  try {
    req.user = await User.findByToken(req.headers.authorization);
    if (req.user.isAdmin) {
      next();
    } else throw new Error();
  } catch (err) {
    next(err);
  }
};

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

router.get("/admin", isAdmin, async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: {
        isCart: false,
      },
      include: [
        {
          model: Lineitem,
          include: Instrument,
        },
        {
          model: User,
        },
      ],
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
    await order.update({ ...req.body, isCart: false });
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

router.put("/cart/:id", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    const order = await Order.findOne({
      where: {
        id: req.params.id,
        userId: user.id,
      },
    });
    const updatedCart = await order.update({ ...req.body });
    res.json(updatedCart);
  } catch (err) {
    next(err);
  }
});
