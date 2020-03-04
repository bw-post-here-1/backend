const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secrets = require('../cnfg/secrets');

const Users = require("../users/users-model");
const { validateUser } = require("../users/users-helpers");

router.post("/register", (req, res) => {
  let user = req.body;

  const validateResult = validateUser(user);
    console.log(user)
  if (validateResult.isSuccessful === true) {

    const hash = bcrypt.hashSync(user.password, 12);
    user.password = hash;

    Users.add(user)
      .then(result => {
        res
          .status(201)
          .json(`User: ${result.username} has been successfully created.`);
      })
      .catch(error => {
        res.status(500).json(`We had an error while attempting registration: ${error}`);
      });
  } else {
    res.status(400).json({
      messsage: "Invalid credentials for account creation.",
      errors: validateResult.errors
    });
  }
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = getJwtToken(user);

        res.status(200).json({ message: `Welcome back, ${user.username}!`, token` });
      } else {
        res.status(401).json({ message: "Invalid user credentials." });
      }
    })
    .catch(error => {
      res.status(500).json({ message: `We had an error while attempting login: ${error}.` });
    });
});

function getJwtToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
  };

  const options = {
    expiresIn: "8h"
  };

  return jwt.sign(payload, secrets.jwtSecret, options);
}

module.exports = router;
