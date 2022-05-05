const Sequelize = require("sequelize");
const db = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const axios = require("axios");
const { BOOLEAN, STRING } = require("sequelize");

const SALT_ROUNDS = 5;

const User = db.define("user", {
  username: {
    type: STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  password: {
    type: STRING,
  },
  email: {
    type: STRING,
    allowNull: false,
    validate: {
      isEmail: true,
      notEmpty: true,
    },
    defaultValue: "jianing@jianing.com",
  },
  streetAddress: {
    type: STRING,
    allowNull: false,
    defaultValue: "121 Johnson Lane",
    validate: {
      notEmpty: true,
    },
  },
  city: {
    type: STRING,
    allowNull: false,
    defaultValue: "Brooklyn",
    validate: {
      notEmpty: true,
    },
  },
  state: {
    type: STRING,
    allowNull: false,
    defaultValue: "New York",
    validate: {
      notEmpty: true,
    },
  },
  zip: {
    type: Sequelize.INTEGER,
    defaultValue: 11235,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  phone: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    defaultValue: "917-111-1234",
  },
  isAdmin: {
    type: BOOLEAN,
    defaultValue: false,
  },
});

module.exports = User;

/**
 * instanceMethods
 */
User.prototype.correctPassword = function (candidatePwd) {
  //we need to compare the plain version to an encrypted version of the password
  return bcrypt.compare(candidatePwd, this.password);
};

User.prototype.generateToken = function () {
  return jwt.sign({ id: this.id }, process.env.JWT);
};

/**
 * classMethods
 */
User.authenticate = async function ({ username, password }) {
  const user = await this.findOne({ where: { username } });
  if (!user || !(await user.correctPassword(password))) {
    const error = Error("Incorrect username/password");
    error.status = 401;
    throw error;
  }
  return user.generateToken();
};

User.findByToken = async function (token) {
  try {
    const { id } = await jwt.verify(token, process.env.JWT);
    const user = User.findByPk(id);
    if (!user) {
      throw "nooo";
    }
    return user;
  } catch (ex) {
    const error = Error("bad token");
    error.status = 401;
    throw error;
  }
};

/**
 * hooks
 */
const hashPassword = async (user) => {
  //in case the password has been changed, we want to encrypt it with bcrypt
  if (user.changed("password")) {
    user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
  }
};

User.beforeCreate(hashPassword);
User.beforeUpdate(hashPassword);
User.beforeBulkCreate((users) => Promise.all(users.map(hashPassword)));
