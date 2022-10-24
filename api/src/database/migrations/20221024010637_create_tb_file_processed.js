/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = knex => knex.schema.createTable('tb_file_processed', table => {
  table.string('uuid', 255).primary()
  table.string('cpf', 50)
  table.string('cpf_valid', 50)
  table.string('private', 50)
  table.string('incomplete', 50)
  table.string('ticket_average', 50)
  table.string('ticket_last_purchase', 50)
  table.string('store_most_frequent', 50)
  table.string('store_most_frequent_valid', 50)
  table.string('store_last_purchase', 50)
  table.string('store_last_purchase_valid', 50)
  table.string('date_last_purchase', 50)
})


/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = knex => knex.schema.dropTable('tb_file_processed')
