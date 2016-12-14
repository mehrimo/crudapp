'use strict';

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries

  return knex('dogs').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('dogs').insert({
          id: 1,
          name: 'Charlie',
          breed:'Wheaton Terrier'
        }),
        knex('dogs').insert({
          id: 2,
          name: 'Bailey',
          breed:'German Shepherd'
        }),
        knex('dogs').insert({
          id: 3,
          name: 'Stolie',
          breed:'Husky'
        })
      ]);
    })
    .then(function(){
  return knex.raw("SELECT setval('dogs_id_seq', (SELECT MAX(id) FROM dogs))");
  });

};
