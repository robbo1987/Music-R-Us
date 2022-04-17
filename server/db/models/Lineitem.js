const Sequelize = require('sequelize');
const { INTEGER } = Sequelize;
const db = require('../db');

const Lineitem =  db.define('lineitem', {
  quantity: INTEGER,
});

module.exports = Lineitem;
