const Sequelize = require("sequelize");
const { STRING, TEXT, INTEGER } = Sequelize;
const db = require("../db");

const Instrument = db.define("instrument", {
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  price: {
    type: INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  inventory: {
    type: INTEGER,
    defaultValue: 20,
  },
  image: {
    type: STRING,
    defaultValue: "stockImage.png",
  },
  description: {
    type: TEXT,
    defaultValue: "Description incoming",
  },
});

module.exports = Instrument;
