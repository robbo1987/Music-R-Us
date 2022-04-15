const Sequelize = require('sequelize');
const { STRING, ENUM, TEXT, INTEGER } = Sequelize;
const db = require('../db');

const Instrument =  db.define('instrument', {
  category : {
    type: ENUM('Guitar', 'Bass', 'Piano', 'Drum'),
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  },
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  },
  price: {
    type: INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  },
  image: {
    type: STRING,
    default: 'test'
  },
  description: {
    type: TEXT,
    defaultValue: 'Description incoming'
  }
});

module.exports = Instrument;