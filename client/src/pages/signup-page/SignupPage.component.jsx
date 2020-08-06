import React from "react";
import { Link } from "react-router-dom";

import AuthLeftPane from "../../components/auth-left-pane/AuthLeftPane.component";

import "./SignupPage.styles.css";

const SignupPage = () => {
  return (
    <section id="signup">
      <div className="columns">
        <AuthLeftPane>Sign up to discover creative web developers</AuthLeftPane>
        <div className="column">
          <div className="container" id="signup-right">
            <h1 className="title">Sign Up</h1>
            <form action="#" method="POST">
              <div className="field">
                <label className="label">Name</label>
                <div className="control has-icons-left">
                  <input
                    className="input"
                    type="text"
                    placeholder="Enter Name"
                    required
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-user"></i>
                  </span>
                </div>
              </div>
              <div className="field">
                <label className="label">Email</label>
                <div className="control has-icons-left">
                  <input
                    className="input"
                    type="email"
                    placeholder="Enter Email"
                    required
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-envelope"></i>
                  </span>
                </div>
                <p className="help">
                  This email will be used to fetch your gravatar
                </p>
              </div>
              <div className="field">
                <label className="label">Password</label>
                <p className="control has-icons-left">
                  <input
                    className="input"
                    type="password"
                    placeholder="Min 6 characters"
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-lock"></i>
                  </span>
                </p>
              </div>
              <div className="field">
                <label className="label">Confirm Password</label>
                <p className="control has-icons-left">
                  <input
                    className="input"
                    type="password"
                    placeholder="Reenter password"
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-lock"></i>
                  </span>
                </p>
              </div>
              <div className="field is-grouped mt-5">
                <p className="control">
                  <button type="submit" className="button green-bg">
                    Submit
                  </button>
                </p>
                <p className="control">
                  <button type="reset" className="button is-light">
                    Cancel
                  </button>
                </p>
              </div>
            </form>
            <p className="mt-6">
              Already have an account ? <Link to="/signin">Sign In</Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignupPage;
