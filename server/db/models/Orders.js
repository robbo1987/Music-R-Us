const Sequelize = require("sequelize");
const { BOOLEAN, STRING, UUID, UUIDV4 } = Sequelize;
const db = require("../db");

const Order = db.define("order", {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
  isCart: {
    type: BOOLEAN,
    defaultValue: false,
  },
  name: {
    type: STRING,
  },
  email: {
    type: STRING,
  },
  streetAddress: {
    type: STRING,
  },
  city: {
    type: STRING,
  },
  state: {
    type: STRING,
  },
  zip: {
    type: Sequelize.INTEGER,
  },
  phone: {
    type: STRING,
  },
});

module.exports = Order;
