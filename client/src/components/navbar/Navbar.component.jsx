import React from "react";
import { Link } from "react-router-dom";

import "./Navbar.styles.css";
import "./Navbar.script";

const Navbar = () => {
  return (
    <nav
      id="navbar"
      className="navbar container"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <Link className="navbar-item" to="/">
          driwwwle
        </Link>

        <a
          href="/#"
          role="button"
          className="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="dropdownMenu"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="dropdownMenu" className="navbar-menu">
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <Link
                className="button has-text-grey"
                to="/signin"
                id="signin-btn"
              >
                Sign In
              </Link>
              <Link className="button primary-bg" to="/signup" id="signup-btn">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
