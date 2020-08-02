const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();

const auth = require("../../middleware/auth");
const Profile = require("../../models/Profile");

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
    }).populate("User", ["name", "avatar"]);

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
    const profiles = await Profile.find().populate("User", ["name", "avatar"]);
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
    }).populate("User", ["name", "avatar"]);

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
    await findOneAndRemove({ user: req.user.id });
    await findOneAndRemove({ _id: req.user.id });
    res.json({ msg: "User deleted" });
  } catch (err) {
    console.error(err.message);
    res
      .status(500)
      .send("There was an issue with the server. Try again later.");
  }
});

module.exports = router;
