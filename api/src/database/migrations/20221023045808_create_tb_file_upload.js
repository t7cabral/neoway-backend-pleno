/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = knex => knex.schema.createTable('tb_file_upload', table => {
  table.increments('id').primary()
  table.string('name', 200).notNullable()
  table.string('size').notNullable()
  table.string('mimetype', 50).notNullable()
  table.string('md5_calc', 32).notNullable()
  table.string('file_storage', 100).notNullable()
  table.string('process_status', 20).notNullable()
  table.timestamp('created_at').defaultTo(knex.fn.now())
})

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = knex => knex.schema.dropTable('tb_file_upload')
