const express = require("express");
const { check, validationResult } = require("express-validator");
const config = require("config");
const axios = require("axios");
const router = express.Router();

const auth = require("../../middleware/auth");
const Profile = require("../../models/Profile");
const User = require("../../models/User");

// @route:    POST /api/profile
// @desc:     Create or update profile
// @access:   Private
router.post(
  "/",
  [
    auth,
    [
      check("bio", "Bio is required").not().isEmpty(),
      check("skills", "Skills are required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Build profile object
    const {
      bio,
      website,
      location,
      skills,
      githubUsername,
      twitter,
      instagram,
      linkedin,
      codepen,
      github,
    } = req.body;

    const profileFields = {};
    profileFields.user = req.user.id;
    if (bio) profileFields.bio = bio;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (githubUsername) profileFields.githubUsername = githubUsername;
    if (skills) {
      profileFields.skills = skills.split(",").map((skill) => skill.trim());
    }

    profileFields.social = {};
    if (twitter) profileFields.social.twitter = twitter;
    if (instagram) profileFields.social.instagram = instagram;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (codepen) profileFields.social.codepen = codepen;
    if (github) profileFields.social.github = github;

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      // If profile already exists, update it
      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );
        return res.json(profile);
      }

      // If profile doesn't exist, make a new one
      profile = new Profile(profileFields);
      await profile.save();
      return res.json(profile);
    } catch (err) {
      console.error(err.message);
      res
        .status(500)
        .send("There was an issue with the server. Try again later.");
    }
  }
);

// @route:    GET api/profile/me
// @desc:     Get current user's profile
// @access:   Private
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    })
      .populate("user", ["name", "avatar"])
      .populate("followers.user", ["name", "avatar"])
      .populate("following.user", ["name", "avatar"]);

    // If there's no profile
    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }

    return res.json(profile);
  } catch {
    console.error(err.message);
    res
      .status(500)
      .send("There was an issue with the server. Try again later.");
  }
});

// @route:    GET /api/profile
// @desc:     Get all profiles
// @access:   Public
router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find()
      .populate("user", ["name", "avatar"])
      .populate("followers.user", ["name", "avatar"])
      .populate("following.user", ["name", "avatar"]);
    res.json(profiles);
  } catch {
    console.error(err.message);
    res
      .status(500)
      .send("There was an issue with the server. Try again later.");
  }
});

// @route:    GET api/profile/user/:user_id
// @desc:     Get profile by user ID
// @access:   Public
router.get("/user/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    })
      .populate("user", ["name", "avatar"])
      .populate("followers.user", ["name", "avatar"])
      .populate("following.user", ["name", "avatar"]);

    // If there's no profile
    if (!profile) {
      return res.status(400).json({ msg: "Profile not found" });
    }

    return res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(400).json({ msg: "Profile not found" });
    }
    res
      .status(500)
      .send("There was an issue with the server. Try again later.");
  }
});

// @route:    DELETE api/profile
// @desc:     Delete user and profile
// @access:   Private
router.delete("/", auth, async (req, res) => {
  try {
    await Profile.findOneAndRemove({ user: req.user.id });
    await User.findOneAndRemove({ _id: req.user.id });
    res.json({ msg: "User deleted" });
  } catch (err) {
    console.error(err.message);
    res
      .status(500)
      .send("There was an issue with the server. Try again later.");
  }
});

// @route:    GET api/profile/github/:username
// @desc:     Get latest GitHub repos
// @access:   Public
router.get("/github/:username", async (req, res) => {
  try {
    const apiURI = encodeURI(
      `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc`
    );
    const response = await axios.get(apiURI, {
      "user-agent": "node.js",
      Authorization: `token ${config.get("GITHUB_API_CLIENT_ID")}`,
    });
    return res.json(response.data);
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ msg: "No GitHub profile" });
  }
});

// @route:    PUT api/profile/follow/:user_id
// @desc:     Follow an user
// @access:   Private
router.put("/follow/:user_id", auth, async (req, res) => {
  try {
    // Check if user exists
    const profile = await Profile.findOne({ user: req.params.user_id });
    if (!profile) {
      return res.status(404).json({ msg: "Profile not found" });
    }

    // Check if user is trying to follow himself/herself
    if (req.params.user_id === req.user.id.toString()) {
      return res.status(400).json({ msg: "You cannot follow yourself" });
    }

    // Check if user is already following
    if (
      profile.followers.filter(
        (follower) => follower.user.toString() === req.user.id
      ).length > 0
    ) {
      return res
        .status(400)
        .json({ msg: "You are already following this user" });
    }

    // Otherwise, handle followers and following
    await Profile.findOneAndUpdate(
      { user: req.user.id },
      {
        $push: { following: { user: req.params.user_id } },
      }
    );

    await Profile.findOneAndUpdate(
      { user: req.params.user_id },
      {
        $push: { followers: { user: req.user.id } },
      }
    );

    res.json({ msg: "User followed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(400).json({ msg: "User not found" });
    }
    res
      .status(500)
      .send("There was an issue with the server. Try again later.");
  }
});

// @route:    PUT api/profile/unfollow/:user_id
// @desc:     Unfollow an user
// @access:   Private
router.put("/unfollow/:user_id", auth, async (req, res) => {
  try {
    // Check if user exists
    const profile = await Profile.findOne({ user: req.params.user_id });
    if (!profile) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Check if user is trying to follow himself/herself
    if (req.params.user_id === req.user.id.toString()) {
      return res.status(400).json({ msg: "You cannot unfollow yourself" });
    }

    // Check if user is following in the first place
    if (
      profile.followers.filter(
        (follower) => follower.user.toString() === req.user.id
      ).length === 0
    ) {
      return res.status(400).json({ msg: "You are not following this user" });
    }

    // Otherwise, handle followers and following
    await Profile.findOneAndUpdate(
      { user: req.user.id },
      {
        $pull: { following: { user: req.params.user_id } },
      }
    );

    await Profile.findOneAndUpdate(
      { user: req.params.user_id },
      {
        $pull: { followers: { user: req.user.id } },
      }
    );
    res.json({ msg: "User unfollowed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(400).json({ msg: "User not found" });
    }
    res
      .status(500)
      .send("There was an issue with the server. Try again later.");
  }
});

module.exports = router;
