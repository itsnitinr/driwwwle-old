import React from "react";
import Moment from "react-moment";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import Comment from "../comment/Comment.component";
import CommentForm from "../comment-form/CommentForm.component";

import { deletePost } from "../../redux/post/post.actions";

import "./PostTiles.styles.css";

const PostTiles = ({
  post: {
    _id,
    description,
    websiteUrl,
    repoUrl,
    techTags,
    comments,
    date,
    likes,
    user,
  },
  auth,
  history,
  deletePost,
}) => {
  return (
    <div className="container tiles-container">
      <div className="tile is-ancestor">
        <div className="tile is-7 is-vertical is-parent">
          <div className="tile is-child">
            <h1 className="title primary-text">Description</h1>
            <p className="subtitle mt-2">
              {description ? description : "No description provided"}
            </p>
            <hr />
          </div>
          <div className="tile add-comment">
            <h1 className="title primary-text">Add a Comment</h1>
            <CommentForm postId={_id} />
            <hr />
          </div>
          <div className="tile comments">
            <h1 className="title primary-text">Comments</h1>
            {comments.length === 0 ? (
              <h3 className="subtitle">No comments</h3>
            ) : (
              comments.map((comment) => (
                <Comment
                  key={comment._id}
                  postId={_id}
                  commentId={comment._id}
                  comment={comment}
                />
              ))
            )}
            <hr />
          </div>
        </div>
        <div className="tile is-5 is-vertical is-parent">
          <div className="tile is-child">
            <div className="post-buttons">
              <a className="button purple-bg mb-3" href={websiteUrl}>
                <i className="fas fa-globe mr-2"></i>
                Visit Live Website
              </a>
              {repoUrl && (
                <a className="button dark-bg mb-3" href={repoUrl}>
                  <i className="fab fa-github mr-2"></i>
                  View Source Code
                </a>
              )}
              {user._id === auth.user._id && (
                <button
                  onClick={(e) => deletePost(_id, history)}
                  className="button is-danger"
                >
                  <i className="fas fa-trash mr-2"></i> Delete This Post
                </button>
              )}
              <hr />
            </div>
          </div>
          <div className="tile is-child">
            <h1 className="title primary-text">Tech Stack</h1>
            <div className="tech-tags">
              <i className="fas fa-tag mr-3"></i>
              <p className="has-text-weight-bold">{techTags.join(", ")}</p>
            </div>
            <hr />
          </div>
          <div className="tile is-child">
            <h1 className="title primary-text">Other information</h1>
            <div className="other-info">
              <i className="fas fa-clock mr-3"></i>
              <span>
                <Moment fromNow>{date}</Moment>
              </span>
              <br />
              <i className="fas fa-heart mr-3"></i>
              <span>{likes.length} likes</span>
              <br />
              <i className="fas fa-comment mr-3"></i>
              <span>{comments.length} comments</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deletePost })(withRouter(PostTiles));
