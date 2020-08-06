import React from "react";
import { Link } from "react-router-dom";

import AuthLeftPane from "../../components/auth-left-pane/AuthLeftPane.component";

import "./SigninPage.styles.css";

const SigninPage = () => {
  return (
    <section id="signin">
      <div className="columns">
        <AuthLeftPane>
          Welcome back ! Ready to inspire and get inspired today ?
        </AuthLeftPane>
        <div className="column">
          <div className="container" id="signin-right">
            <h1 className="title">Sign In</h1>
            <form action="#" method="POST">
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
              Don't have an account ? <Link to="/signup">Sign Up</Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SigninPage;
