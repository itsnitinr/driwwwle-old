import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import AuthLeftPane from "../../components/auth-left-pane/AuthLeftPane.component";

import { setAlert } from "../../redux/alert/alert.actions";
import { registerUser } from "../../redux/auth/auth.actions";

import "./SignupPage.styles.css";

const SignupPage = ({ setAlert, registerUser, isAuthenticated, isLoading }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== password2) {
      setAlert("Password do not match", "is-danger");
    } else if (password.length < 6) {
      setAlert("Password should be atleast 6 characters long", "is-danger");
    } else {
      registerUser({ name, email, password });
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <section id="signup">
      <div className="columns">
        <AuthLeftPane>Sign up to discover creative web developers</AuthLeftPane>
        <div className="column">
          <div className="container" id="signup-right">
            <h1 className="title">Sign Up</h1>
            <form onSubmit={(e) => onSubmit(e)}>
              <div className="field">
                <label className="label">Name</label>
                <div className="control has-icons-left">
                  <input
                    className="input"
                    type="text"
                    placeholder="John Doe"
                    name="name"
                    value={name}
                    onChange={(e) => onChange(e)}
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
              <div className="field">
                <label className="label">Confirm Password</label>
                <p className="control has-icons-left">
                  <input
                    className="input"
                    type="password"
                    placeholder="Reenter password"
                    name="password2"
                    value={password2}
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
              Already have an account ? <Link to="/signin">Sign In</Link>
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

export default connect(mapStateToProps, { setAlert, registerUser })(SignupPage);
