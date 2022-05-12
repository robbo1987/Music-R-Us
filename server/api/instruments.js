const router = require("express").Router();
const {
  models: { Instrument, User },
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
    const instruments = await Instrument.findAll();
    res.json(instruments);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const instrument = await Instrument.findByPk(req.params.id);
    await instrument.update({ ...req.body });
    console.log(instrument);
    res.json(instrument);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", isAdmin, async (req, res, next) => {
  try {
    const instrument = await Instrument.findByPk(req.params.id);
    await instrument.destroy();
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});
