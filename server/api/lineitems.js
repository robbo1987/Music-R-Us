const router = require("express").Router();
const {
  models: { Lineitem, Order, User },
} = require("../db");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    await User.findByToken(req.headers.authorization);
    res.json(await Lineitem.findAll());
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const lineItem = await Lineitem.create(req.body);
    res.status(201).send(lineItem);
  } catch (ex) {
    next(ex);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const lineitem = await Lineitem.findOne({
      where: {
        id: req.params.id,
      },
    });
    await lineitem.update({ quantity: req.body.quantity });
    res.json(lineitem);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const lineitem = await Lineitem.findByPk(req.params.id * 1);
    await lineitem.destroy();
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});
