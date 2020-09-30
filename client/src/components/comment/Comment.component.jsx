import React from "react";
import Moment from "react-moment";
import { connect } from "react-redux";

import { deleteComment } from "../../redux/post/post.actions";

import "./Comment.styles.css";

const Comment = ({ comment, auth, postId, commentId, deleteComment }) => {
  return (
    <article className="media">
      <figure className="media-left">
        <p className="image is-64x64">
          <img src={comment.avatar} alt="User avatar" />
        </p>
      </figure>
      <div className="media-content">
        <div className="content">
          <p>
            <strong>
              {comment.name}
              <br />
            </strong>
            <small>
              <Moment fromNow>{comment.date}</Moment>
            </small>
            <br />
            {comment.text}
          </p>
        </div>
      </div>
      {comment.userId === auth.user._id && (
        <div className="media-right">
          <button
            onClick={(e) => deleteComment(postId, commentId)}
            className="delete mr-5"
          ></button>
        </div>
      )}
    </article>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteComment })(Comment);
