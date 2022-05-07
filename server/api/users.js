const router = require("express").Router();
const {
  models: { User },
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
    const users = await User.findAll({
      attributes: ["id", "username"],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.get("/admin", isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "username", "isAdmin", "email", "isBanned"],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.put("/admin/:id", isAdmin, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user.isAdmin) await user.update({ isBanned: !user.isBanned });
    res.json(user);
  } catch (err) {
    next(err);
  }
});
