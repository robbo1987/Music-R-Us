const Sequelize = require("sequelize");
const { BOOLEAN } = Sequelize;
const db = require("../db");

const Order = db.define("order", {
  isCart: {
    type: BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Order;
