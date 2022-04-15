const Sequelize = require('sequelize');
const { STRING } = Sequelize;
const db = require('../db');

const Brand =  db.define('brand', {
  name: {
    type: STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  },
});

module.exports = Brand;