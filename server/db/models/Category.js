const Sequelize = require("sequelize");
const { STRING } = Sequelize;
const db = require("../db");

const Category = db.define("category", {
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  image: {
    type: STRING,
    defaultValue: "stockImage.png",
  },
  sound: {
    type: STRING,
  },
});

module.exports = Category;
