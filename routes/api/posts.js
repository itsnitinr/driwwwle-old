const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();

const auth = require("../../middleware/auth");
const upload = require("../../middleware/cloudinary");
const Post = require("../../models/Post");
const User = require("../../models/User");

// @route:    POST api/posts
// @desc:     Create a post
// @access:   Private
router.post(
  "/",
  [
    auth,
    upload,
    [
      check("title", "Title is required").not().isEmpty(),
      check("techTags", "Atleast 1 tag is required").not().isEmpty(),
      check("websiteUrl", "Enter a valid URL").isURL(),
      check("websiteUrl", "Website URL is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if(req.fileValidationError) errors.errors.push({msg:req.fileValidationError});
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

// @route:    GET api/posts
// @desc:     Get all posts
// @access:   Private
router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ date: -1 })
      .populate("user", ["name", "avatar"]);
    res.json(posts);
  } catch (err) {
    res
      .status(500)
      .send("There was an issue with the server. Try again later.");
  }
});

// @route:    GET api/posts/feed
// @desc:     Get posts of following users
// @access:   Private
router.get("/feed", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    // Create an array of user ids of following
    const following = profile.following.map((following) => following.user._id);

    // Get posts of following users
    const posts = await Post.find({ user: { $in: following } })
      .sort("-date")
      .populate("user", ["name", "avatar"]);

    res.json(posts);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send("There was an issue with the server. Try again later.");
  }
});

// @route:    GET api/posts/:post_id
// @desc:     Get post by ID
// @access:   Private
router.get("/:post_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id)
      .populate("user", ["name", "avatar"])
      .populate("likes.user", ["name", "avatar"])
      .populate("comments.user", ["name", "avatar"]);

    // If there's no such post
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    res.json(post);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    res
      .status(500)
      .send("There was an issue with the server. Try again later.");
  }
});

// @route:    GET api/posts/user/:user_id
// @desc:     Get all posts by an user
// @access:   Private
router.get("/user/:user_id", auth, async (req, res) => {
  try {
    const posts = await Post.find({
      user: req.params.user_id,
    }).populate("user", ["name", "avatar"]);
    if (!posts) {
      return res.status(400).json({ msg: "No posts found" });
    }
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    res
      .status(500)
      .send("There was an issue with the server. Try again later.");
  }
});

// @route:    DELETE api/posts/:post_id
// @desc:     Delete post by ID
// @access:   Private
router.delete("/:post_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    // If there's no such post
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    // Check ownership of post
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Unauthorized" });
    }

    await post.remove();
    res.json({ msg: "Post deleted" });
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    res
      .status(500)
      .send("There was an issue with the server. Try again later.");
  }
});

// @route:    PUT api/posts/like/:id
// @desc:     Like a post
// @access:   Private
router.put("/like/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if post is already liked
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({ msg: "Post already liked" });
    }

    // Add to likes array
    post.likes.unshift({ user: req.user.id });
    await post.save();
    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res
      .status(500)
      .send("There was an issue with the server. Try again later.");
  }
});

// @route:    PUT api/posts/unlike/:id
// @desc:     Unlike a post
// @access:   Private
router.put("/unlike/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if post exists
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    // Check if post has been liked
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: "Post has not been liked yet" });
    }

    // Get remove index
    const removeIndex = post.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);
    post.likes.splice(removeIndex, 1);
    await post.save();
    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    res
      .status(500)
      .send("There was an issue with the server. Try again later.");
  }
});

// @route:    POST api/post/comment/:post_id
// @desc:     Post a comment
// @access:   Private
router.post(
  "/comment/:post_id",
  [auth, [check("text", "Comment text is required").not().isEmpty()]],
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const post = await Post.findById(req.params.post_id);
      const user = await User.findById(req.user.id).select("name avatar");

      const newComment = {
        name: user.name,
        avatar: user.avatar,
        text: req.body.text,
        userId: req.user.id,
      };
      post.comments.unshift(newComment);
      await post.save();
      res.json(post.comments);
    } catch (err) {
      console.error(err.message);
      res
        .status(500)
        .send("There was an issue with the server. Try again later.");
    }
  }
);

// @route:    DELETE api/post/comment/:post_id/:comment_id
// @desc:     Delete a comment
// @access:   Private
router.delete("/comment/:id/:comment_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if comment exists
    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );
    if (!comment) {
      return res.status(404).json({ msg: "Comment does not exist" });
    }

    // Check if comment is posted by the same user
    if (comment.userId !== req.user.id) {
      return res.status(401).json({ msg: "Unauthorized" });
    }

    // Remove comment
    const removeIndex = post.comments
      .map((comment) => comment.userId)
      .indexOf(req.user.id);
    post.comments.splice(removeIndex, 1);
    await post.save();
    res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
