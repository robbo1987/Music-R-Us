const router = require("express").Router();
const {
  models: { Instrument },
} = require("../db");
module.exports = router;

require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

router.post("/checkout", async (req, res, next) => {
  try {
    const instruments = await Instrument.findAll();
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.cartItems.map((item) => {
        const stripeItem = instruments.find(
          (instrument) => instrument.id === item.instrumentId
        );
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: stripeItem.name,
            },
            unit_amount: stripeItem.price * 100,
          },
          quantity: item.quantity,
        };
      }),
      success_url: `${process.env.SERVER_URL}/ordersuccess`,
      cancel_url: `${process.env.SERVER_URL}/cart`,
    });
    res.json(session.url);
  } catch (err) {
    next(err);
  }
});
