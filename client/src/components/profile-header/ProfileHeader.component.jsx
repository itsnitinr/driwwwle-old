import React from "react";
import { Link } from "react-router-dom";

import "./ProfileHeader.styles.css";

const ProfileHeader = ({ profile }) => {
  if (!profile) {
    return (
      <div id="profile-header">
        <div class="text-container">
          <h1 class="title">Uh oh ! Profile not yet created.</h1>
          <Link
            to="/profile/new"
            class="button is-danger is-inverted is-outlined"
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
      <div class="text-container">
        <h1 class="title">{profile.user.name}</h1>
        <h3 class="subtitle">{profile.bio}</h3>
        <Link
          to="/profile/edit"
          class="button is-danger is-inverted is-outlined"
        >
          Edit Profile
        </Link>
      </div>
    </div>
  );
};

export default ProfileHeader;
