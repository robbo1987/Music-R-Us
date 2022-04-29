const Sequelize = require("sequelize");
const { BOOLEAN, VIRTUAL } = Sequelize;
const db = require("../db");

const Lineitem = require("./Lineitem");
const Instrument = require("./Instruments");

const Order = db.define("order", {
  isCart: {
    type: BOOLEAN,
    defaultValue: false,
  },
  total: {
    type: VIRTUAL,
    async get() {
      const lineitems = await Lineitem.findAll({
        where: {
          orderId: this.id,
        },
      });
      const total = lineitems.reduce(async (acc, item) => {
        const instrument = await Instrument.findByPk(item.instrumentId);
        return acc + instrument.price * item.quantity;
      }, 0);
      return total;
    },
  },
});

module.exports = Order;
