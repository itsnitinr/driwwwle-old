const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();

const auth = require("../../middleware/auth");
const upload = require("../../middleware/cloudinary");
const Post = require("../../models/Post");

// @route:    POST api/posts
// @desc:     Create a post
// @access:   Private
router.post(
  "/",
  [
    auth,
    [
      check("title", "Title is required").not().isEmpty(),
      check("techTags", "Atleast 1 tag is required").not().isEmpty(),
      check("websiteUrl", "Enter a valid URL").isURL(),
      check("websiteUrl", "Website URL is required").not().isEmpty(),
    ],
    upload,
  ],
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Create post object
      const { title, description, techTags, websiteUrl, repoUrl } = req.body;

      const newPost = {};
      newPost.user = req.user.id;
      if (title) newPost.title = title;
      if (description) newPost.description = description;
      if (websiteUrl) newPost.websiteUrl = websiteUrl;
      if (repoUrl) newPost.repoUrl = repoUrl;

      // Get only links from the file object
      if (req.files) {
        newPost.images = req.files.map((image) => image.path);
      }

      // Split comma seperated tags into individual tags
      if (techTags) {
        newPost.techTags = techTags.split(",").map((tag) => tag.trim());
      }

      const post = new Post(newPost);
      await post.save();
      res.json(post);
    } catch (err) {
      console.error(err.message);
      res
        .status(500)
        .send("There was an issue with the server. Try again later.");
    }
  }
);

module.exports = router;
