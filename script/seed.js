"use strict";

const {
  db,
  models: { User, Instrument, Category, Brand, Lineitem, Order },

} = require("../server/db");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users
  const users = await Promise.all([
    User.create({ username: "cody", password: "123" }),
    User.create({ username: "murphy", password: "123" }),
  ]);

  const [Fender, Gibson, PRS, Jackson, Steinway] = await Promise.all(
    ["Fender", "Gibson", "PRS", "Jackson", "Steinway"].map((brand) => {
      return Brand.create({ name: brand });
    })
  );

  const [Guitar, Piano, Bass] = await Promise.all(
    ["Guitar", "Piano", "Bass"].map((category) => {
      return Category.create({ name: category });
    })
  );
  const instruments = await Promise.all([
    Instrument.create({
      categoryId: Guitar.id,
      name: "Stratocaster",
      price: 999,
      brandId: Fender.id,
    }),
    Instrument.create({
      categoryId: Guitar.id,
      name: "Telecaster",
      price: 999,
      brandId: Fender.id,
    }),
    Instrument.create({
      categoryId: Guitar.id,
      name: "Les Paul Standard",
      price: 999,
      brandId: Gibson.id,
    }),
    Instrument.create({
      categoryId: Guitar.id,
      name: "Les Paul Custom",
      price: 999,
      brandId: Gibson.id,
    }),
    Instrument.create({
      categoryId: Guitar.id,
      name: "Les Paul 1960 Reissue ",
      price: 999,
      brandId: Gibson.id,
    }),
    Instrument.create({
      categoryId: Guitar.id,
      name: "Les Paul Classic",
      price: 999,
      brandId: Gibson.id,
    }),
    Instrument.create({
      categoryId: Guitar.id,
      category: "Guitar",
      name: "Custom-24",
      price: 999,
      brandId: PRS.id,
    }),
    Instrument.create({
      categoryId: Guitar.id,
      name: "Custom-22",
      price: 999,
      brandId: PRS.id,
    }),
    Instrument.create({
      categoryId: Guitar.id,
      name: "Soloist",
      price: 999,
      brandId: Jackson.id
    }),
    Instrument.create({
      categoryId: Piano.id,
      name: "Baby-Grand",
      price: 999,
      brandId: Steinway.id,
    }),
    Instrument.create({
      categoryId: Bass.id,
      name: "Jazz-Bass",
      price: 999,
      brandId: Fender.id,
    }),
    Instrument.create({
      categoryId: Bass.id,
      name: "P-Bass",
      price: 999,
      brandId: Fender.id,
    }),
    Instrument.create({
      categoryId: Bass.id,
      name: "SG STANDARD BASS",
      price: 999,
      brandId: Gibson.id,
    }),
    Instrument.create({
      categoryId: Bass.id,
      name: "Thunderbird Bass",
      price: 999,
      brandId: Gibson.id,
    }),
    Instrument.create({
      categoryId: Piano.id,
      name: "Model D",
      price: 999,
      brandId: Steinway.id,
    }),
    Instrument.create({
      categoryId: Piano.id,
      name: "Model B",
      price: 999,
      brandId: Steinway.id,
    }),
    Instrument.create({
      categoryId: Piano.id,
      name: "Model A",
      price: 999,
      brandId: Steinway.id,
    }),
    Instrument.create({
      categoryId: Piano.id,
      name: "Model O",
      price: 999,
      brandId: Steinway.id,
    }),
    Instrument.create({
      categoryId: Piano.id,
      name: "Model M",
      price: 999,
      brandId: Steinway.id,
    }),
    Instrument.create({
      categoryId: Piano.id,
      name: "Model S",
      price: 999,
      brandId: Steinway.id,
    }),
    Instrument.create({
      categoryId: Piano.id,
      name: "SPIRIO",
      price: 999,
      brandId: Steinway.id,
    }),
    Instrument.create({
      categoryId: Guitar.id,
      name: "Pro Series Jeff Loomis",
      price: 999,
      brandId: Jackson.id,
    }),
    Instrument.create({
      categoryId: Guitar.id,
      name: "Pro Series Rhandy Rhoads",
      price: 999,
      brandId: Jackson.id,
    }),
    Instrument.create({
      categoryId: Guitar.id,
      name: "Pro Series King V",
      price: 999,
      brandId: Jackson.id,
    }),
    Instrument.create({
      categoryId: Bass.id,
      name: "David Ellefson Signature Model",
      price: 999,
      brandId: Jackson.id,
    }),
    Instrument.create({
      categoryId: Bass.id,
      name: "X Series",
      price: 999,
      brandId: Jackson.id,
    }),
    Instrument.create({
      categoryId: Bass.id,
      name: "JS3",
      price: 999,
      brandId: Jackson.id,
    }),
  ]);

  const orders = await Promise.all([
    Order.create({ userId: 1 }),
    Order.create({ userId: 1 }),
    Order.create({ userId: 1 }),
    Order.create({ userId: 1 }),
    Order.create({ userId: 2 }),
    Order.create({ userId: 2 }),
    Order.create({ userId: 2 }),
    Order.create({ userId: 2 }),
    Order.create({ userId: 2 }),
    Order.create({ userId: 2 }),
  ]);

  const lineitems = await Promise.all([
    Lineitem.create({ quantity: 2, instrumentId: 1, orderId: 1 }),
    Lineitem.create({ quantity: 1, instrumentId: 2, orderId: 2 }),
    Lineitem.create({ quantity: 2, instrumentId: 3, orderId: 3 }),
    Lineitem.create({ quantity: 2, instrumentId: 4, orderId: 4 }),
    Lineitem.create({ quantity: 1, instrumentId: 5, orderId: 5 }),
    Lineitem.create({ quantity: 2, instrumentId: 6, orderId: 6 }),
    Lineitem.create({ quantity: 1, instrumentId: 7, orderId: 7 }),
    Lineitem.create({ quantity: 2, instrumentId: 8, orderId: 8 }),
    Lineitem.create({ quantity: 1, instrumentId: 9, orderId: 9 }),
    Lineitem.create({ quantity: 3, instrumentId: 12, orderId: 6 }),
    Lineitem.create({ quantity: 4, instrumentId: 16, orderId: 7 }),
    Lineitem.create({ quantity: 4, instrumentId: 18, orderId: 8 }),
    Lineitem.create({ quantity: 3, instrumentId: 19, orderId: 9 }),
  ]);
  //await Lineitem.create({quantity: 4, instrumentId: instruments[0].id, orderId: order.id})
  // console.log(await order.total)

  console.log(lineitems);
  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);
  return {
    users: {
      cody: users[0],
      murphy: users[1],
    },
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;

// inventory
// fender startocaster
