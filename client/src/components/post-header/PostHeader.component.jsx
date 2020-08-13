import React from "react";
import { Link } from "react-router-dom";

import "./PostHeader.styles.css";

const PostHeader = ({ post: { user, title } }) => {
  return (
    <div className="post-header px-5">
      <div className="post-header-left">
        <img src={user.avatar} alt="Post owner avatar" />
        <div className="post-header-text">
          <h1>{title}</h1>
          <h3>
            by{" "}
            <Link
              to={`/profile/${user._id}`}
              className="primary-text has-text-weight-bold"
            >
              {user.name}
            </Link>
          </h3>
        </div>
      </div>
      <div className="post-header-right">
        <button className="button is-danger">
          <i className="fas fa-heart mr-2"></i> Like
        </button>
      </div>
    </div>
  );
};

export default PostHeader;
