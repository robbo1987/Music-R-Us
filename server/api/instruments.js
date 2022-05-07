const router = require("express").Router();
const {
  models: { Instrument, User },
} = require("../db");
module.exports = router;

const isLoggedIn = async (req, res, next) => {
  try {
    req.user = await User.findByToken(req.headers.authorization);
    next();
  } catch (err) {
    next(err);
  }
};

router.get("/", async (req, res, next) => {
  try {
    const { pageNumber, itemsPerPage } = req.query;

    const instruments = await Instrument.findAndCountAll({
      limit: itemsPerPage,
      offset: (pageNumber - 1) * itemsPerPage,
    });
    res.send(instruments);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const instrument = await Instrument.findByPk(req.params.id);
    console.log(instrument);
    await instrument.update({ inventory: req.body.inventory });
    res.json(instrument);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", isLoggedIn, async (req, res, next) => {
  try {
    const instrument = await Instrument.findByPk(req.params.id);
    await instrument.destroy();
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});
