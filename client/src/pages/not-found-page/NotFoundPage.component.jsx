import React from "react";

import Navbar from "../../components/navbar/Navbar.component";
import Footer from "../../components/footer/Footer.component";
import { ReactComponent as NotFoundImage } from "../../assets/images/404.svg";

import "./NotFoundPage.styles.css";

const NotFoundPage = () => {
  return (
    <>
      <Navbar />
      <div id="not-found" className="container px-5">
        <div>
          <NotFoundImage id="not-found-image" />
        </div>
        <h1 className="mt-2">Houston, we have a problem !</h1>
        <p className="mt-3">
          The page you requested was not found. Are you sure you have entered
          the correct ID ?
        </p>
      </div>
      <Footer />
    </>
  );
};

export default NotFoundPage;
