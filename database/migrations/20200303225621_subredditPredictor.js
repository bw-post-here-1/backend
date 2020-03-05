exports.up = function(knex) {
    return knex.schema
    .createTable("users", tbl => {
        tbl.increments();
        tbl
          .string("username", 64)
          .notNullable()
          .unique();
        tbl.string("password", 64)
          .notNullable();
        tbl
          .string("email", 128)
          .notNullable()
          .unique();
      })
    .createTable('posts', tbl => {
        tbl.increments();
        tbl.string('title', 450)
        .notNullable();
        tbl.string('subreddit', 128);
        tbl.text('post')
        .notNullable();
        tbl
        .integer("user_id")
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    });
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('users')
    .dropTableIfExists('posts');
};
