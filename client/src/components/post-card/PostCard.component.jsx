import React from "react";
import { Link } from "react-router-dom";

import "./PostCard.styles.css";

const PostCard = ({ post }) => {
  return (
    <div className="post column is-one-third">
      <div className="post-main">
        <Link to={`/posts/${post._id}`}>
          <img
            className="post-image"
            src={post.images[post.images.length - 1]}
            alt="Website banner"
          />
        </Link>
        <div className="card-overlay">
          <h1>{post.title}</h1>
        </div>
      </div>
      <div className="post-footer">
        <div className="post-description">
          <Link to={`/profile/${post.user._id}`}>
            <div className="user-info dark-text">
              <img src={post.user.avatar} alt="User avatar" />
              <h1>{post.user.name}</h1>
            </div>
          </Link>
          <div className="like-comment">
            <i className="far fa-heart"></i>
            <span className="ml-1">{post.likes.length}</span>
            <i className="far fa-comment ml-2"></i>
            <span className="ml-1">{post.comments.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
