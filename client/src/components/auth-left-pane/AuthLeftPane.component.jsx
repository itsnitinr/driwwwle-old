import React from "react";
import "./AuthLeftPane.styles.css";

const AuthLeftPane = ({ children }) => {
  return (
    <div className="column is-one-third" id="auth-left-panel">
      <div className="text-container">
        <h1>driwwwle</h1>
        <p>{children}</p>
      </div>
    </div>
  );
};

export default AuthLeftPane;
