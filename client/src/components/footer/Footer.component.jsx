import React from "react";
import "./Footer.styles.css";

const Footer = () => {
  return (
    <footer id="footer">
      <h1>
        Made with love by <span>Nitin Ranganath</span>
      </h1>
      <div className="socialIcons">
        <a href="https://instagram.com/iamnitinr">
          <i className="fab fa-instagram"></i>
        </a>
        <a href="https://twitter.com/IAmNitinR">
          <i className="fab fa-twitter"></i>
        </a>
        <a href="https://www.linkedin.com/in/nitin-ranganath-35b4611b0/">
          <i className="fab fa-linkedin"></i>
        </a>
        <a href="https://github.com/itsnitinr">
          <i className="fab fa-github"></i>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
