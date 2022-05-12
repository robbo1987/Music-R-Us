const db = require("./db");

const User = require("./models/User");
const Instrument = require("./models/Instruments");
const Brand = require("./models/Brands");
const Order = require("./models/Orders");
const Lineitem = require("./models/Lineitem");
const Category = require("./models/Category");

Brand.hasMany(Instrument);
Instrument.belongsTo(Brand);
User.hasMany(Instrument);
Instrument.belongsTo(User);

Brand.hasMany(Category);
Category.belongsTo(Brand);
Category.hasMany(Instrument);
Instrument.belongsTo(Category);

User.hasMany(Order);
Order.belongsTo(User);
Order.hasMany(Lineitem);
Lineitem.belongsTo(Order);
Lineitem.belongsTo(Instrument);
Instrument.hasMany(Lineitem);

module.exports = {
  db,
  models: {
    User,
    Category,
    Instrument,
    Brand,
    Lineitem,
    Order,
  },
};
