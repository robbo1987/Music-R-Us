//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Instrument = require('./models/Instruments')
const Brand = require('./models/Brands')

//associations could go here!

Brand.hasMany(Instrument);
Instrument.belongsTo(Brand);
User.hasMany(Instrument);
Instrument.belongsTo(User);

module.exports = {
  db,
  models: {
    User,
    Instrument,
    Brand,
  },
}
