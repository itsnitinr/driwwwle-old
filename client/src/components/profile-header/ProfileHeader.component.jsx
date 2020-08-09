import React from "react";
import { Link } from "react-router-dom";

import "./ProfileHeader.styles.css";

const ProfileHeader = ({ profile }) => {
  if (!profile) {
    return (
      <div id="profile-header">
        <div className="text-container">
          <h1 className="title">Uh oh ! Profile not yet created.</h1>
          <Link
            to="/profile/new"
            className="button is-danger is-inverted is-outlined"
          >
            Create Profile
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div id="profile-header">
      <img src={profile.user.avatar} alt="User avatar" />
      <div className="text-container">
        <h1 className="title">{profile.user.name}</h1>
        <h3 className="subtitle">{profile.bio}</h3>
        <Link
          to="/profile/edit"
          className="button is-danger is-inverted is-outlined"
        >
          Edit Profile
        </Link>
      </div>
    </div>
  );
};

export default ProfileHeader;
