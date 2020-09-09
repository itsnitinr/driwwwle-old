import React from "react";

import "./FollowList.styles.css";

const FollowList = ({ list, which }) => {
  return (
    <>
      {list.length === 0 ? (
        <h1 className="title full-screen-follow">No {`${which}`}</h1>
      ) : (
        <div className="follow-list columns is-multiline">
          {list.map((follow) => (
            <div
              key={follow.user._id}
              className="follow-list-item column is-2 is-4-mobile"
            >
              <img src={follow.user.avatar} alt="Follow avatar" />
              <h1 className="has-text-weight-bold">{follow.user.name}</h1>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default FollowList;
