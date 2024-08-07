/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("items",(table)=>{
    table.increments().primary();
    table.integer("userID").references("id").inTable("users").notNullable();
    table.string("name");
    table.text("description");
    table.integer("quantity");
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable("items", table=>{
    table.dropForeign("userID")
  }).then(()=>{return knex.schema.dropTableIfExists("items")})
};
