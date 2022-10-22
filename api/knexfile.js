const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  client: 'pg',
  version: '15.0',
  connection: {
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    user: process.env.POSTGRES_USER,
    password: String(process.env.POSTGRES_PASSWORD),
    database: process.env.POSTGRES_DB
  },
  debug: false,
  migrations: {
    tableName: 'knex_migrations',
    directory: `${__dirname}/src/database/migrations`
  }
}
