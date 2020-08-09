import React from "react";
import { Link } from "react-router-dom";
import "./AuthLeftPane.styles.css";

const AuthLeftPane = ({ children }) => {
  return (
    <div className="column is-one-third" id="auth-left-panel">
      <div className="text-container">
        <Link to="/" className="logo">
          driwwwle
        </Link>
        <p>{children}</p>
      </div>
    </div>
  );
};

export default AuthLeftPane;
