import React from "react";

const FollowList = ({ list, which }) => {
  return (
    <>
      {list.length === 0 ? (
        <h1>No {`${which}`}</h1>
      ) : (
        list.map((follow) => <h1>{follow.user.name}</h1>)
      )}
    </>
  );
};

export default FollowList;
