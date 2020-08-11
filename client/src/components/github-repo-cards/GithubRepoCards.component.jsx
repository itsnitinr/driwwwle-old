import React, { useEffect } from "react";
import { connect } from "react-redux";

import { getGithubRepos } from "../../redux/profile/profile.actions";

import "./GithubRepoCards.styles.css";

const GithubRepoCards = ({ getGithubRepos, username, repos }) => {
  useEffect(() => {
    getGithubRepos(username);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="repo-cards">
      {repos.map((repo) => (
        <div className="card" key={repo.id}>
          <div className="card-content">
            <div className="media">
              <div className="media-left">
                <figure className="image is-48x48">
                  <img src={repo.owner.avatar_url} alt="GitHub avatar" />
                </figure>
              </div>
              <div className="media-content">
                <a href={repo.html_url} className="title is-4">
                  {repo.name}
                </a>
                <p className="subtitle is-6 mt-1">{username}</p>
              </div>
            </div>
            <div className="content">
              {repo.description ? repo.description : "No description provided"}
              <br />
            </div>
          </div>
          <footer className="card-footer">
            <p className="card-footer-item">
              {repo.stargazers_count}
              <i className="fas fa-star ml-2"></i>
            </p>
            <p className="card-footer-item">
              {repo.watchers_count}
              <i className="fas fa-eye ml-2"></i>
            </p>
            <p className="card-footer-item">
              {repo.forks_count}
              <i className="fas fa-code-branch ml-2"></i>
            </p>
          </footer>
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  repos: state.profile.repos,
});

export default connect(mapStateToProps, { getGithubRepos })(GithubRepoCards);
