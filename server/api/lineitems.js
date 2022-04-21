const router = require("express").Router();
const {
  models: { Lineitem },
} = require("../db");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const lineItems = await Lineitem.findAll();
    res.json(lineItems);
  } catch (err) {
    next(err);
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
