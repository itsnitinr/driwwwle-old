import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import AuthLeftPane from "../../components/auth-left-pane/AuthLeftPane.component";

import { loginUser } from "../../redux/auth/auth.actions";

import "./SigninPage.styles.css";

const SigninPage = ({ loginUser, isAuthenticated, isLoading }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    loginUser(email, password);
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <section id="signin">
      <div className="columns">
        <AuthLeftPane>
          Welcome back ! Ready to inspire and get inspired today ?
        </AuthLeftPane>
        <div className="column">
          <div className="container" id="signin-right">
            <h1 className="title">Sign In</h1>
            <form onSubmit={(e) => onSubmit(e)}>
              <div className="field">
                <label className="label">Email</label>
                <div className="control has-icons-left">
                  <input
                    className="input"
                    type="email"
                    placeholder="example@example.com"
                    name="email"
                    value={email}
                    onChange={(e) => onChange(e)}
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
                    placeholder="Enter password"
                    name="password"
                    value={password}
                    onChange={(e) => onChange(e)}
                    required
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-lock"></i>
                  </span>
                </p>
              </div>
              <p className="control mt-5">
                <button
                  type="submit"
                  className={`button green-bg ${
                    isLoading ? "is-loading" : null
                  }`}
                >
                  Submit
                </button>
              </p>
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

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isLoading: state.auth.loading
});

export default connect(mapStateToProps, { loginUser })(SigninPage);
