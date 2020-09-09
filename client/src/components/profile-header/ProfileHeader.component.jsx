import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import "./ProfileHeader.styles.css";

const ProfileHeader = ({ profile, ownProfile, isDashboard, auth, id }) => {
  const followUser = async () => {
    await axios.put(`/api/profile/follow/${id}`);
    window.location.reload(false);
  };

  const unfollowUser = async () => {
    await axios.put(`/api/profile/unfollow/${id}`);
    window.location.reload(false);
  };

  const followOrUnfollowButton = () => {
    if (
      profile.followers.filter(
        (follower) => follower.user._id === auth.user._id
      ).length === 0
    ) {
      return (
        <button
          onClick={followUser}
          className="button is-danger is-inverted is-outlined"
        >
          <i className="fas fa-user-plus mr-2"></i>Follow
        </button>
      );
    } else {
      return (
        <button
          onClick={unfollowUser}
          className="button is-danger is-inverted is-outlined"
        >
          <i className="fas fa-user-minus mr-2"></i>Unfollow
        </button>
      );
    }
  };

  if (!profile) {
    return (
      <div id="profile-header" className="full-screen">
        <div className="text-container">
          <h1 className="title">Uh oh ! Profile not yet created.</h1>
          <Link
            to="/profile/new"
            className="button is-danger is-inverted is-outlined"
          >
            <i className="fas fa-user-cog mr-2"></i>Create Profile
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
        {ownProfile || isDashboard ? (
          <Link
            to="/profile/edit"
            className="button is-danger is-inverted is-outlined"
          >
            <i className="fas fa-user-edit mr-2"></i>Edit Profile
          </Link>
        ) : (
          followOrUnfollowButton()
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(ProfileHeader);
