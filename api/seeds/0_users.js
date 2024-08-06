/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {firstName: 'Dan', lastName: 'Miller', userName: 'fireball', password: '1111'},
    {firstName: 'Travis', lastName: 'Eltork', userName: 'eltork', password: '2222'},
    {firstName: 'Arren', lastName: 'Dedios', userName: 'azure', password: '3333'}
  ]);
};
