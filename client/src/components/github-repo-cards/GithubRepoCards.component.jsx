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
        <div class="card" key={repo.id}>
          <div class="card-content">
            <div class="media">
              <div class="media-left">
                <figure class="image is-48x48">
                  <img src={repo.owner.avatar_url} alt="GitHub avatar" />
                </figure>
              </div>
              <div class="media-content">
                <p class="title is-4">{repo.name}</p>
                <p class="subtitle is-6">{username}</p>
              </div>
            </div>
            <div class="content">
              {repo.description ? repo.description : "No description provided"}
              <br />
            </div>
          </div>
          <footer class="card-footer">
            <p class="card-footer-item">
              {repo.stargazers_count}
              <i class="fas fa-star"></i>
            </p>
            <p class="card-footer-item">
              {repo.watchers_count}
              <i class="fas fa-eye"></i>
            </p>
            <p class="card-footer-item">
              {repo.forks_count}
              <i class="fas fa-code-branch"></i>
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
