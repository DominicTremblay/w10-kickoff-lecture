const faker = require('faker');

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return Promise.all([
    knex('users').del(),
    knex.raw('ALTER SEQUENCE users_id_seq RESTART WITH 1'),
    knex('users').then(function() {
      // Inserts seed entries
      return knex('users').insert([
        {
          first_name: 'SpongeBob',
          last_name: 'Squarepants',
          email: 'bob@sq.com',
          password: 'test',
        },
        {
          first_name: faker.name.firstName(),
          last_name: faker.name.lastName(),
          email: faker.internet.email(),
          password: faker.internet.password(),
        },
        {
          first_name: faker.name.firstName(),
          last_name: faker.name.lastName(),
          email: faker.internet.email(),
          password: faker.internet.password(),
        },
        {
          first_name: faker.name.firstName(),
          last_name: faker.name.lastName(),
          email: faker.internet.email(),
          password: faker.internet.password(),
        },
      ]);
    }),
  ]);
};
