/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('items').del()
  await knex('items').insert([
    {userID: 1, name: 'Couch', description: 'A place for sitting', quantity: 4},
    {userID: 1, name: 'Trading Cards', description: 'Magic the Gathering Cards', quantity: 10000000},
    {userID: 1, name: 'Plane', description: 'cesna', quantity: 1},
    {userID: 2, name: 'Couch', description: 'A place for sitting', quantity: 4},
    {userID: 2, name: 'Trading Cards', description: 'Magic the Gathering Cards', quantity: 10000000},
    {userID: 2, name: 'Plane', description: 'cesna', quantity: 1},
    {userID: 3, name: 'Couch', description: 'A place for sitting', quantity: 4},
    {userID: 3, name: 'Trading Cards', description: 'Magic the Gathering Cards', quantity: 10000000},
    {userID: 3, name: 'Plane', description: 'cesna', quantity: 1}
  ]);
};
