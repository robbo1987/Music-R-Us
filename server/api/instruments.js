const router = require("express").Router();
const {
  models: { Instrument },
} = require("../db");
module.exports = router;

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
    console.log(instrument);
    await instrument.update( {inventory: req.body.inventory})
    res.json(instrument)
  } catch (err) {
    next(err);
  }
});
