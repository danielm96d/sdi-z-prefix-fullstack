/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("users", (table)=>{
    table.increments().primary();
    table.string("firstname")
    table.string("lastname")
    table.string("username").notNullable();
    table.string("password") //need to work on encrypting this.
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists("users")
};
