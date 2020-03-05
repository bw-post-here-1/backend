const bcrypt = require("bcryptjs");

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      const adric = bcrypt.hashSync("adric", 12)
      const rosie = bcrypt.hashSync("rosie", 12)
      const logan = bcrypt.hashSync("logan", 12)

      // Inserts seed entries
      return knex('users').insert([
        {
          id: 1,
          username: 'adric',
          password:adric,
          email:'adric@email.com'
        },
        {
          id: 2,
          username: 'rosie',
          password:rosie,
          email:'rosie@email.com'
        },
        {
          id: 3,
          username: 'logan',
          password:logan,
          email:'logan@email.com'
        },
      ]);
    });
};
