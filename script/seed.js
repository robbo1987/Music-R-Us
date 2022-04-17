'use strict'

const {db, models: {User, Instrument, Brand, Lineitem, Order} } = require('../server/db')

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }) // clears db and matches models to tables
  console.log('db synced!')

  // Creating Users
  const users = await Promise.all([
    User.create({ username: 'cody', password: '123' }),
    User.create({ username: 'murphy', password: '123' }),
  ])

  const [Fender, Gibson, PRS, Jackson, Steinway] = await Promise.all(
    ['Fender', 'Gibson', 'PRS', 'Jackson', 'Steinway'].map(brand =>{
      return Brand.create({ name: brand })
    })
  )

  const instruments = await Promise.all([
    Instrument.create({
      category: 'Guitar',
      name: 'Stratocaster',
      price: 999,
      brandId: Fender.id
    }),
    Instrument.create({
      category: 'Guitar',
      name: 'Telecaster',
      price: 999,
      brandId: Fender.id
    }),
    Instrument.create({
      category: 'Guitar',
      name: 'Les Paul Standard',
      price: 999,
      brandId: Gibson.id
    }),
    Instrument.create({
      category: 'Guitar',
      name: 'Les Paul Custom',
      price: 999,
      brandId: Gibson.id
    }),
    Instrument.create({
      category: 'Guitar',
      name: 'Les Paul 1960 Reissue ',
      price: 999,
      brandId: Gibson.id
    }),
    Instrument.create({
      category: 'Guitar',
      name: 'Les Paul Classic',
      price: 999,
      brandId: Gibson.id
    }),
    Instrument.create({
      category: 'Guitar',
      name: 'Custom-24',
      price: 999,
      brandId: PRS.id
    }),
    Instrument.create({
      category: 'Guitar',
      name: 'Custom-22',
      price: 999,
      brandId: PRS.id
    }),
    Instrument.create({
      category: 'Guitar',
      name: 'Soloist',
      price: 999,
      brandId: Jackson.id,
    }),
    Instrument.create({
      category: 'Piano',
      name: 'Baby-Grand',
      price: 999,
      brandId: Steinway.id
    }),
    Instrument.create({
      category: 'Bass',
      name: 'Jazz-Bass',
      price: 999,
      brandId: Fender.id
    }),
    Instrument.create({
      category: 'Bass',
      name: 'P-Bass',
      price: 999,
      brandId: Fender.id
    }),
    Instrument.create({
      category: 'Bass',
      name: 'SG STANDARD BASS',
      price: 999,
      brandId: Gibson.id
    }),
    Instrument.create({
      category: 'Bass',
      name: 'Thunderbird Bass',
      price: 999,
      brandId: Gibson.id
    }),
    Instrument.create({
      category: 'Piano',
      name: 'Model D',
      price: 999,
      brandId: Steinway.id
    }),
    Instrument.create({
      category: 'Piano',
      name: 'Model B',
      price: 999,
      brandId: Steinway.id
    }),
    Instrument.create({
      category: 'Piano',
      name: 'Model A',
      price: 999,
      brandId: Steinway.id
    }),
    Instrument.create({
      category: 'Piano',
      name: 'Model O',
      price: 999,
      brandId: Steinway.id
    }),
    Instrument.create({
      category: 'Piano',
      name: 'Model M',
      price: 999,
      brandId: Steinway.id
    }),
    Instrument.create({
      category: 'Piano',
      name: 'Model S',
      price: 999,
      brandId: Steinway.id
    }),
    Instrument.create({
      category: 'Piano',
      name: 'SPIRIO',
      price: 999,
      brandId: Steinway.id
    }),
    Instrument.create({
      category: 'Guitar',
      name: 'Pro Series Jeff Loomis',
      price: 999,
      brandId: Jackson.id,
    }),
    Instrument.create({
      category: 'Guitar',
      name: 'Pro Series Rhandy Rhoads',
      price: 999,
      brandId: Jackson.id,
    }),
    Instrument.create({
      category: 'Guitar',
      name: 'Pro Series King V',
      price: 999,
      brandId: Jackson.id,
    }),
    Instrument.create({
      category: 'Bass',
      name: 'David Ellefson Signature Model',
      price: 999,
      brandId: Jackson.id,
    }),
    Instrument.create({
      category: 'Bass',
      name: 'X Series',
      price: 999,
      brandId: Jackson.id,
    }),
    Instrument.create({
      category: 'Bass',
      name: 'JS3',
      price: 999,
      brandId: Jackson.id,
    }),
  ])
  const order = await Order.create()
  const lineitem = await Lineitem.create({quantity: 4, instrumentId: instruments[0].id, orderId: order.id})
  // console.log(await order.total)

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
  return {
    users: {
      cody: users[0],
      murphy: users[1]
    }
  }
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed


// inventory
// fender startocaster