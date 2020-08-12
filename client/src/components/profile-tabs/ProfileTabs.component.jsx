import React, { useState } from "react";

import ProfileAbout from "../profile-about/ProfileAbout.component";
import FollowList from "../../components/follow-list/FollowList.component";
import ProfilePosts from "../../components/profile-posts/ProfilePosts.component";

import "./ProfileTabs.styles.css";

const ProfileTabs = ({ profile, userId }) => {
  const [activeTab, setActiveTab] = useState("posts");

  return (
    <>
      {!profile ? null : (
        <>
          <div className="tabs is-boxed">
            <ul>
              <li
                onClick={() => setActiveTab("posts")}
                className={activeTab === "posts" ? "is-active" : undefined}
              >
                <a href="#!">
                  <span className="icon is-small">
                    <i className="fas fa-image" aria-hidden="true"></i>
                  </span>
                  <span>Posts</span>
                </a>
              </li>
              <li
                onClick={() => setActiveTab("about")}
                className={activeTab === "about" ? "is-active" : undefined}
              >
                <a href="#!">
                  <span className="icon is-small">
                    <i className="fas fa-user" aria-hidden="true"></i>
                  </span>
                  <span>About</span>
                </a>
              </li>
              <li
                onClick={() => setActiveTab("followers")}
                className={activeTab === "followers" ? "is-active" : undefined}
              >
                <a href="#!">
                  <span className="icon is-small">
                    <i className="fas fa-user-friends" aria-hidden="true"></i>
                  </span>
                  <span>Followers</span>
                </a>
              </li>
              <li
                onClick={() => setActiveTab("following")}
                className={activeTab === "following" ? "is-active" : undefined}
              >
                <a href="#!">
                  <span className="icon is-small">
                    <i className="fas fa-user-friends" aria-hidden="true"></i>
                  </span>
                  <span>Following</span>
                </a>
              </li>
            </ul>
          </div>
          <div
            className="tab-content"
            style={activeTab === "posts" ? { display: "block" } : null}
          >
            <ProfilePosts userId={userId} />
          </div>
          <div
            className="tab-content"
            style={activeTab === "about" ? { display: "block" } : null}
          >
            <ProfileAbout profile={profile} />
          </div>
          <div
            className="tab-content"
            style={activeTab === "followers" ? { display: "block" } : null}
          >
            <FollowList
              list={profile ? profile.followers : []}
              which="followers"
            />
          </div>
          <div
            className="tab-content"
            style={activeTab === "following" ? { display: "block" } : null}
          >
            <FollowList
              list={profile ? profile.following : []}
              which="following"
            />
          </div>
        </>
      )}
    </>
  );
};

export default ProfileTabs;
