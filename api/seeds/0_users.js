/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  const bcrypt = require('bcryptjs')
  let pass1 = await bcrypt.hash('1111', 10);
  let pass2 = await bcrypt.hash('2222', 10);
  let pass3 = await bcrypt.hash('3333', 10);

  await knex('users').del()
  await knex('users').insert([
    {firstname: 'Dan', lastname: 'Miller', username: 'fireball', password: pass1},
    {firstname: 'Travis', lastname: 'Eltork', username: 'eltork', password: pass2},
    {firstname: 'Arren', lastname: 'Dedios', username: 'azure', password: pass3}
  ]);
};
