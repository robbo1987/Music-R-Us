//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Instrument = require('./models/Instruments')
const Brand = require('./models/Brands');
const Order = require('./models/Orders');
const Lineitem = require('./models/Lineitem');

//associations could go here!

Brand.hasMany(Instrument);
Instrument.belongsTo(Brand);
User.hasMany(Instrument);
Instrument.belongsTo(User);

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
    Instrument,
    Brand,
    Lineitem,
    Order,
  },
}
