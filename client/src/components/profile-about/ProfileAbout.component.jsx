import React from "react";

import GithubRepoCards from "../github-repo-cards/GithubRepoCards.component";

import "./ProfileAbout.styles.css";

const ProfileAbout = ({
  profile: { bio, website, location, skills, social, githubUsername },
}) => {
  return (
    <>
      <h1 className="title about-title">About Me</h1>
      <section className="profile-about-content">
        <div className="about-user">
          {location && (
            <h1>
              <i className="fas fa-map-marker-alt primary-text ml-1 mr-3"></i>
              {location}
            </h1>
          )}
          {skills && (
            <h1>
              <i className="fas fa-laptop-code primary-text"></i>
              {skills.join(", ")}
            </h1>
          )}
          {bio && (
            <h1>
              <i className="fas fa-comment-alt primary-text"></i>
              {bio}
            </h1>
          )}
        </div>
        <div className="about-socials">
          {website && (
            <a href={website}>
              <i className="fas fa-globe blue-text"></i>
            </a>
          )}
          {social && social.twitter && (
            <a href={social.twitter}>
              <i className="fab fa-twitter blue-text"></i>
            </a>
          )}
          {social && social.instagram && (
            <a href={social.instagram}>
              <i className="fab fa-instagram purple-text"></i>
            </a>
          )}
          {social && social.linkedin && (
            <a href={social.linkedin}>
              <i className="fab fa-linkedin skyblue-text"></i>
            </a>
          )}
          {social && social.codepen && (
            <a href={social.codepen}>
              <i className="fab fa-codepen dark-text"></i>
            </a>
          )}
          {social && social.github && (
            <a href={social.github}>
              <i className="fab fa-github dark-text"></i>
            </a>
          )}
        </div>
      </section>
      {githubUsername && (
        <>
          <h1 className="title github-title">
            Latest GitHub Repos <i className="fab fa-github"></i>
          </h1>
          <GithubRepoCards username={githubUsername} />
        </>
      )}
    </>
  );
};

export default ProfileAbout;
