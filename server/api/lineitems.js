const router = require("express").Router();
const {
  models: { Lineitem, User, Order },
} = require("../db");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const lineitems = await Lineitem.findAll();
    res.json(lineitems);
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

    if (req.params.id === "localcart") {
      //get localcart from req.body and token from req.headers
      const localcart = req.body.localcart;
      const token = req.headers.authorization;
      //find the logged in user and the user's database cart
      const user = await User.findByToken(token);
      const databaseCart = await Order.findOne({
        where: {
          isCart: true,
          userId: user.id,
        },
      });
      //find all the lineitems associated with the logged in user's db cart
      const lineitems = await Lineitem.findAll({
        where: {
          orderId: databaseCart.id,
        },
      });
      //loop through the localcart lineitems
      for (let i = 0; i < localcart.lineitems.length; i++) {
        let combined = false;
        let cartitem = localcart.lineitems[i];
        //for every localcart lineitem, check to see if there is a lineitem with a matching instrumentId, if there is a match, combine the two quantities and set combined to true
        for (let i = 0; i < lineitems.length; i++) {
          const databaseLineitem = lineitems[i];
          if (cartitem.instrumentId === databaseLineitem.instrumentId) {
            await databaseLineitem.update({
              quantity: databaseLineitem.quantity + cartitem.quantity,
            });
            combined = true;
          }
        }
        //if combined is false i.e. there is no db lineitem with the instrumentId matching the localcart lineitem's instrumentId, then create a new lineitem in db
        if (!combined) {
          await Lineitem.create({
            quantity: cartitem.quantity,
            instrumentId: cartitem.instrumentId,
            orderId: databaseCart.id,
          });
        }
      }
      //send back all the lineitems
      res.json(await Lineitem.findAll());
    } else {
      const lineitem = await Lineitem.findByPk(req.params.id);
      await lineitem.update({ quantity: req.body.quantity });
      res.json(lineitem);
    }
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
