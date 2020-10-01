const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  bio: {
    type: String,
    required: true,
  },
  website: {
    type: String,
    trim: true,
    lowercase: true,
  },
  location: {
    type: String,
    trim: true,
  },
  skills: {
    type: [String],
    required: true,
  },
  githubUsername: {
    type: String,
    trim: true,
  },
  followers: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],
  following: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],
  social: {
    twitter: {
      type: String,
      trim: true,
      lowercase: true,
    },
    instagram: {
      type: String,
      trim: true,
      lowercase: true,
    },
    linkedin: {
      type: String,
      trim: true,
      lowercase: true,
    },
    codepen: {
      type: String,
      trim: true,
      lowercase: true,
    },
    github: {
      type: String,
      trim: true,
      lowercase: true,
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Profile = mongoose.model("Profile", ProfileSchema);
