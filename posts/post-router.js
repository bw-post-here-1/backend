const express = require("express");
const Posts = require("./posts-model");
const router = express.Router();

router.get("/", (req, res) => {
  Posts.find()
    .then(post => {
      res.status(200).json(post);
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: `We failed to get posts: ${error}` });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  Posts.findById(id)
    .then(post => {
      if (post) {
        res.json(post);
      } else {
        res
          .status(404)
          .json({ message: "We couldn't find a post with the given ID." });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: `We failed to get the requested post: ${error}` });
    });
});

router.get("/:id/user", (req, res) => {
  const { id } = req.params;

  Posts.findByPost(id)
    .then(post => {
      if (post.length > 0) {
        res.status(200).json(post);
      } else {
        res.status(404).json({
          message: "We couldn't find user post information for specified ID."
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: `We failed to get the requested post information: ${error}`
      });
    });
});

router.post("/", (req, res) => {
  const postData = req.body;
  Posts.add(postData)
    .then(post => {
      res
        .status(201)
        .json({ message: "We successfully created the post." });
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: `We failed to create a new post: ${error}` });
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { title, post, subreddit, user_id } = req.body;
  const changes = { id, post, title, subreddit, user_id };

  Posts.findById(id)
    .then(post => {
      if (post) {
        Posts.update(changes, id).then(updatedpost => {
          res
            .status(200)
            .json({ message: "We successfully updated this post.", updatedpost });
        });
      } else {
        res
          .status(404)
          .json({ message: "We couldn't find the post with that ID." });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: `We failed to create a new post: ${error}` });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  Posts.remove(id)
    .then(deleted => {
      if (deleted) {
        res
          .status(200)
          .json({ message: "We successfully deleted this post." });
      } else {
        res.status(404).json({
          message: "We couldn't find the post with the specified ID."
        });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: `We failed to delete the post: ${error}` });
    });
});

module.exports = router;
