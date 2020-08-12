import React from "react";
import Moment from "react-moment";

const Comment = ({ user: { name, avatar }, text, date }) => {
  return (
    <article className="media">
      <figure className="media-left">
        <p className="image is-64x64">
          <img src={avatar} alt="User avatar" />
        </p>
      </figure>
      <div className="media-content">
        <div className="content">
          <p>
            <strong>{name}</strong>
            <small>
              <Moment fromNow>{date}</Moment>
            </small>
            <br />
            {text}
          </p>
        </div>
      </div>
      <div className="media-right">
        <button className="delete"></button>
      </div>
    </article>
  );
};

export default Comment;
