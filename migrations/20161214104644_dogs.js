'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('dogs', function(table) {
    table.increments();
    table.string('breed').notNullable().defaultTo('');
    table.string('name').notNullable().defaultTo('');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('dogs');
};
