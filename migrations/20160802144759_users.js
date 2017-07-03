exports.up = function (knex, Promise) {
  return knex.schema.createTable('games', function (table) {
    table.increments('id').primary()
    table.string('squares')
    table.integer('width')
    table.integer('height')
    table.integer('mines')
    table.boolean('failed')
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('games')
}
