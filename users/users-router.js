const express = require("express");
const Users = require("./users-model");
const router = express.Router();

router.get("/", (req, res) => {
  Users.find()
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "We failed to get users." });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  Users.findById(id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res
          .status(404)
          .json({ message: "We could not find a user with the given ID." });
      }
    })
    .catch(error => {
      res.status(500).json({ message: `We failed to get the user: ${error}` });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  Users.remove(id)
    .then(deleted => {
      if (deleted) {
        res.status(200).json({ message: "We successfully deleted this user." });
      } else {
        res
          .status(404)
          .json({ message: "We could not find the user with the specified ID." });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: `We failed to delete the user: ${error}` });
    });
});

module.exports = router;
