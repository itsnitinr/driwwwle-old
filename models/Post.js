const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  images: {
    type: [String],
    required: true,
  },
  techTags: {
    type: [String],
    required: true,
  },
  websiteUrl: {
    type: String,
    required: true,
    trim: true,
  },
  repoUrl: {
    type: String,
    trim: true,
  },
  likes: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],
  comments: [
    {
      name: {
        type: String,
        required: true,
      },
      userId: {
        type: String,
        required: true,
      },
      avatar: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
      text: {
        type: String,
        trim: true,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Post = mongoose.model("Post", PostSchema);
