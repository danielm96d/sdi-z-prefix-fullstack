/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  const bcrypt = require('bcryptjs')
  let pass1 = await bcrypt.hash("smoughs-fat-ass", 10);
  let pass2 = await bcrypt.hash('jolly-cooperation', 10);
  let pass3 = await bcrypt.hash('give-it-a-smack', 10);

  await knex('users').del()
  await knex('users').insert([
    {firstname: 'Leo', lastname: 'Ornstein', username: 'lightning-god69', password: pass1},
    {firstname: 'Solaire', lastname: 'Astora', username: 'Sun-Man4000', password: pass2},
    {firstname: 'Alexander', lastname: 'Iron Fist', username: 'Jar-Head-King', password: pass3}
  ]);
};
