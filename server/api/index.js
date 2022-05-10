

const router = require("express").Router();
module.exports = router;

router.use("/users", require("./users"));
router.use("/instruments", require("./instruments"));
router.use("/brands", require("./brands"));
router.use("/categories", require("./categories"));
router.use("/lineitems", require("./lineitems"));
router.use("/orders", require("./orders"));
router.use('/google-login',require('./google-login'));

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
