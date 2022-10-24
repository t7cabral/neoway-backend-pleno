const knexfile = require('./knexfile')
const knex = require('knex')

const database = knexfile.connection.database;
delete knexfile.connection.database;

const start = async () => {
  let _knex = knex(knexfile);
  await _knex.raw('CREATE DATABASE IF NOT EXISTS ??', database);
  knexfile.connection.database = database;
  _knex = knex(knexfile);
  await _knex.migrate.latest();
  return;
}

start().catch(console.log).then(process.exit)
