const db = require("../database/dbConfig");

module.exports = {
  find,
  findBy,
  add,
  findById,
  remove
};

function find() {
  return db("users").select("id", "username", "email");
}

function findBy(user) {
  return db("users")
    .select("id", "username", "password")
    .where(user);
}

function add(user) {
  return db("users")
    .insert(user, "id")
    .then(ids => {
      const [id] = ids;
      return findById(id);
    });
}

function findById(id) {
  return db("users")
    .select("id", "username", "email")
    .where({ id })
    .first();
}

function remove(id) {
  return db("users")
    .where({ id })
    .del();
}
