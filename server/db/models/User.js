const Sequelize = require("sequelize");
const db = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { BOOLEAN, STRING } = require("sequelize");

const SALT_ROUNDS = 5;

const User = db.define("user", {
  username: {
    type: STRING,
  },
  password: {
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
  isAdmin: {
    type: BOOLEAN,
    defaultValue: false,
  },
  isBanned: {
    type: BOOLEAN,
    defaultValue: false,
  },
  googleId: {
    type: STRING,
    allowNull: true,
  },
});

module.exports = User;

User.prototype.correctPassword = function (candidatePwd) {
  return bcrypt.compare(candidatePwd, this.password);
};

User.prototype.generateToken = function () {
  return jwt.sign({ id: this.id }, process.env.JWT);
};

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

const hashPassword = async (user) => {
  if (user.changed("password")) {
    user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
  }
};

User.beforeCreate(hashPassword);
User.beforeUpdate(hashPassword);
User.beforeBulkCreate((users) => Promise.all(users.map(hashPassword)));
