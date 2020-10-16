import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { ReactComponent as HeaderImage } from "../../assets/images/headerImage.svg";
import Navbar from "../../components/navbar/Navbar.component";
import Footer from "../../components/footer/Footer.component";

import "./LandingPage.styles.css";

const LandingPage = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <>
      <Navbar />
      <main id="landing">
        <div className="container">
          <div className="columns">
            <div className="column">
              <div className="text-container">
                <h1 className="title">Dribbble, but for web developers!</h1>
                <p className="subtitle has-text-grey">
                  A portal for web developers and freelancers to showcase their
                  work to the world. Share and get inspired by creatives for
                  free!
                </p>
                <Link to="/signup" className="button primary-bg">
                  Get Started
                </Link>
              </div>
            </div>
            <div className="column">
              <HeaderImage id="landing-image" />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(LandingPage);
