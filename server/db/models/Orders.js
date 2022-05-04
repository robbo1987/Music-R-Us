const Sequelize = require("sequelize");
const { BOOLEAN, VIRTUAL, STRING, UUID, UUIDV4 } = Sequelize;
const db = require("../db");

const Lineitem = require("./Lineitem");
const Instrument = require("./Instruments");

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
    defaultValue: "jianing@jianing.com",
  },
  email: {
    type: STRING,
    defaultValue: "jianing@jianing.com",
  },
  streetAddress: {
    type: STRING,
    defaultValue: "121 Johnson Lane",
  },
  city: {
    type: STRING,
    defaultValue: "Brooklyn",
  },
  state: {
    type: STRING,
    defaultValue: "New York",
  },
  zip: {
    type: Sequelize.INTEGER,
    defaultValue: 11235,
  },
  phone: {
    type: STRING,
    defaultValue: "917-111-1234",
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
